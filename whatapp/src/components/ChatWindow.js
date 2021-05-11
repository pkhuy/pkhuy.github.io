import React, { useEffect, useState, useRef } from 'react';
import './ChatWindow.css';
import EmojiPicker from 'emoji-picker-react';
import Peer from "simple-peer"
import io from "socket.io-client"
import MessageItem from './MessageItem';
import Api from '../Api';

import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import CallEndIcon from '@material-ui/icons/CallEnd';

const socket = io.connect('http://localhost:5000')

function ChatWindow({user, data}) {

    let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition();
    }

    const [emojiOpen, setEmojiOpen] = useState(false);
    const [text, setText] = useState('');
    const [listening, setListening] = useState(false);
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);

    const body = useRef();

    useEffect(() => {
        setList([]);
        let unsub = Api.onChatContent(data.chatId, setList, setUsers);
        return unsub;
    }, [data.chatId]);

    useEffect(() => {
        if (body.current.scrollHeight > body.current.offsetHeight) {
            body.current.scrollTop = body.current.scrollheight - body.current.offsetHeight;
        }
    }, [list])

    const handleEmojiClick = (e, emojiObject) => {
        setText(text + emojiObject.emoji);
    }

    const handleOpenEmoji = () => {
        setEmojiOpen(true);
    }

    const handleCloseEmoji = () => {
        setEmojiOpen(false);
    }

    const handleMicClick = () => {
        if (recognition !== null) {
            recognition.onstart = () => {
                setListening(true);
            }
            recognition.onend = () => {
                setListening(false);
            }
            recognition.onresult = (e) => {
                setText(e.results[0][0].transcript);
            }
            recognition.start();
        }
    }

    const handleInputKeyUp = (e) => {
        if (e.keyCode === 13) {
            handleSendClick();
        }
    }

    const handleSendClick = () => {
        if (text !== '') {
            Api.sendMessage(data, user.id, 'text', text, users);
            setText('');
            setEmojiOpen(false);
        }
    }

    {/*Viseo*/}
    const [ me, setMe ] = useState("")
	const [ stream, setStream ] = useState()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(false)
	const [ name, setName ] = useState("")
	const myVideo = useRef()
	const userVideo = useRef()
    const connectionRef = useRef()
    
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream)
            myVideo.current.srcObject = stream
        })

        socket.on("me", (id) => {
            setMe(id)
        })

        socket.on("callUser", (data) => {
            setReceivingCall(true)
            setCaller(data.from)
            setName(data.name)
            setCallerSignal(data.signal)
        })
    }, [])

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name
            })
        })
        peer.on("stream", (stream) => {

            userVideo.current.srcObject = stream

        })
        socket.on("callAccepted", (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        })

        connectionRef.current = peer
    }

    const answerCall = () => {
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller })
        })
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })

        peer.signal(callerSignal)
        connectionRef.current = peer
    }

    const leaveCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy()
    }
    
    const [vidCon, setVidCon] = useState("");

    const handleVideoOn = () => {
        setVidCon(true)
    }

    const handleVideoOff = () => {
        setVidCon(false)
    }

    return (
        <div className="chatWindow">
            <div className="chatWindow--header">
                <div className="chatWindow--headerInfo">
                    <img className="chatWindow--avatar" src={data.image} alt="" />
                    <div className="chatWindow--name">{data.title}</div>
                </div>
                <div className="chatWindow-headerbuttons">
                    <div className="chatWindow--btn">
                        <AttachFileIcon style={{ color: '#919191' }} />
                    </div>
                    <div className="chatWindow--btn">
                        <VideoCallIcon style={{ color: 'red' }} onClick={handleVideoOn} />
                    </div>
                </div>
            </div>

            <div ref={body} className="chatWindow--body">
                {list.map((item, key) => (
                    <MessageItem
                        key={key}
                        data={item}
                        user={user}
                    />
                ))}
                <div className="video-container">
                    {/* myvideo */}
                    <div className="video">
                        {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: vidCon ? "300px" : "0px" }} />}
                        <CallEndIcon style={{color: "red"}} onClick={handleVideoOff} />
                    </div>
                    {/*video thang khac */}
                    <div className="video">
                        {callAccepted && !callEnded ?
                            <video playsInline ref={userVideo} autoPlay style={{ width: "300px" }} /> : null}
                    </div>
                </div>
            </div>

            <div
                className="chatWindow--emojiarea"
                style={{height: emojiOpen ? '200px' : '0px'}}
            >
                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    disableSearchBar
                    disableSkinTonePicker  
                />
            </div>
            <div className="chatWindow--footer">
                <div className="chatWindow--pre">
                    <div
                        className="chatWindow--btn"
                        onClick={handleOpenEmoji}
                    >
                        <InsertEmoticonIcon style={{ color: '#919191' }} />
                    </div>
                    <div
                        className="chatWindow--btn"
                        onClick={handleCloseEmoji}
                        style={{width: emojiOpen?40:0}}
                    >
                        <CloseIcon style={{ color: '#919191' }} />
                    </div>
                </div>
                <div className="chatWindow--inputarea">
                    <input
                        className="chatWindow--input"
                        type="text"
                        placeholder="type sth"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyUp={handleInputKeyUp}
                    />
                </div>
                <div className="chatWindow--pos">
                    {text === '' &&
                        <div onClick={handleMicClick} className="chatWindow--btn">
                            <MicIcon style={{ color: listening? '#126EcE':'#919191' }} />
                        </div>
                    }
                    {text !== '' && 
                        <div onCLick={handleSendClick} className="chatWindow--btn">
                            <SendIcon style={{ color: '#919191' }} />
                        </div>
                    }
                    
                </div>
            </div>
        </div>
    );
}

export default ChatWindow;