import IO from 'socket.io-client'
import Peer  from 'react-native-peerjs'

import {
    ADD_STREAM,
    MY_STREAM,
    ADD_REMOTE_STREAM
} from "./types";
import { dispatch } from 'rxjs/internal/observable/pairs';

// API URI

export const API_URI = `http://192.168.47.194:5000`

//SCOKET config
export const socket = IO(`${API_URI}`, {
    forceNew: true,
});

socket.on('connection', () => console.log('Connection'));

//PEER config
// const peerServer = new Peer(undefined, {
//     host: '192.168.47.194',
//     seccure: false,
//     port: 5000,
//     path: '/mypeer',
// });

// peerServer.on('error', console.log);

export const joinRoom = (stream) => async (dispatch) => {
    const roomID = 'asdlfjasldkjfksajdlkfjafasfasfa'
    dispatch({ type: MY_STREAM, payload: stream });

    //Open a connection 
    peerServer.on('open', (userId) => {
        socket.emit('join-room', { userId, roomID });
    });

    socket.on('user-connected', (userId) => {
        connectToNewUser(userId, stream, dispatch)
    });

    //Receive a call
    peerServer.on('call', (call) => {
        call.answer(stream)
        
        //Stream back the call
        call.on('stream', (stream) => {
            dispatch({ type: ADD_STREAM, payload: stream });
        });
    });
};

function connectToNewUser(userId, stream, dispatch) {
    const call = peerServer.call(userId, stream);

    call.on('stream', (remoteVideoStream) => {
        if (remoteVideoStream) {
            dispatch({ type: ADD_REMOTE_STREAM, payload: remoteVideoStream });
        }
    })
}