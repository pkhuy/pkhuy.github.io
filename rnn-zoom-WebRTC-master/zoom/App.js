import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RTCView, mediaDevices } from 'react-native-webrtc';

import { connect } from 'react-redux'
import { joinRoom } from './src/store/actions/videoActions'

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
    let isFront = true;
    mediaDevices.enumerateDevices().then(sourceInfos => {
      console.log(sourceInfos);
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
          videoSourceId = sourceInfo.deviceId;
        }
      }
      mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: 640,
          height: 480,
          frameRate: 30,
          facingMode: (isFront ? "user" : "environment"),
          deviceId: videoSourceId
        }
      })
        .then(stream => {
          // Got stream!
          this.props.joinRoom(stream);
        })
        .catch(error => {
          // Log error
        });
    });
  }


  rennder() {
    const { streams, remoteStreams } = this.props.video;
    console.log(remoteStreams)

    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', padding: 10 }}>
        <View style={{ flex: 1, justifyContent: 'center', height: height * 0.5, borderColor: 'yellow', borderWidth: 4 }}>
          {this.props.video.myStream ? (
            <RTCView streamURL={this.props.video.myStream.toURL()}
            style={{width, height: height * 0.4}}
            />
          ): null}
        </View>
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <ScrollView horizontal style={{ padding: 10 }}>
            <>
              {streams.length > 0 ? (
                <>
                  {streams.map((_, index) => (
                    <View
                      key={index}
                      style={{
                        width: 200,
                        backgroundColor: 'red',
                        borderWidth: 1,
                        borderColor: '#fff',
                        marginRight: 10,
                        padding: 5,
                      }}>
                        <RTCView streamURL={stream.toURL()}
                          style={{ width: 180, height: height * 0.4 }}
                        />
                    </View>
                  ))}
                </>
              ) : null}
            </>

            {remoteStreams.length > 0 ?

              <>
                {remoteStreams.map((stream, index) => {
                  <View
                  key={index}
                    style={{
                      width: 200,
                      backgroundColor: 'blue',
                      borderWidth: 1,
                      borderColor: '#fff',
                      marginRight: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <RTCView streamURL={this.props.video.myStream.toURL()}
                      style={{ width, height: height * 0.4 }}
                    />
                  </View>
                })}
              </> : null}
          </ScrollView>
        </View>
      </View>

    );
  }
}

const mapStateToProps = ({ video }) => ({
  video,  
})

export default connect()(App);