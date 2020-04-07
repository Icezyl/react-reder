import React, { useState, useRef, useEffect } from 'react'
import AgoraRTC from 'agora-rtc-sdk'
import api from '../../api'
import io from '../../io'
import './style.less'
import { Button } from 'antd-mobile'
const CallVideo = props => {
  const localVideo = useRef()
  const remoteVideo = useRef()
  const [operation, setOperation] = useState(props.operation)
  const [success, setSuccess] = useState(false)
  const [exchange, setExChange] = useState(true)
  const [option, setOption] = useState({
    appID: "34dac50c186e449eb7e1224608bc3fba",
    channel: props.channel,
    uid: '',
    token: ""
  })
  const [rtc, setRtc] = useState({
    client: AgoraRTC.createClient({ mode: "rtc", codec: "h264" }),
    joined: false,
    published: false,
    localStream: null,
    remoteStreams: [],
    params: {}
  })
  useEffect(() => {
    api.generateRtcToken({ channelName: option.channel }).then(res => {
      setOption({ ...option, token: res.key })
    })
  }, [])
  useEffect(() => {
    let tt = setTimeout(() => {
      if (option.token && props.call) {
        fn()
      }
    }, 1000)
    return () => {
      clearTimeout(tt)
    }
  }, [option.token])
  io.on('refuseVideo', data => {
    if (success) {
      close()
    } else {
      props.onRefuse({ video: false })
    }
  })
  const fn = () => {
    rtc.client.init(option.appID, function () {
      rtc.client.join(option.token, option.channel, null, function (uid) {
        let localStream = AgoraRTC.createStream({
          streamID: uid,
          audio: true,
          video: true,
          screen: false,
        })
        setRtc({ ...rtc, params: { uid: uid }, localStream: localStream })
        localStream.init(function () {
          setSuccess(true)
          io.emit('callVideo', { channel: option.channel, id: props.user._id, from: props.id })
          console.log(props)
          localVideo.current.srcObject = localStream.stream
          rtc.client.publish(localStream, function (err) {
            console.log("publish failed");
            console.error(err);
          })
        }, function (err) {
          console.error("init local stream failed ", err);
        })
      }, function (err) {
        console.log("getUserMedia failed", err);
      });
    }, (err) => {
      console.error(err)
    })
    rtc.client.on("stream-added", function (evt) {
      var remoteStream = evt.stream;
      var id = remoteStream.getId();
      if (id !== rtc.params.uid) {
        rtc.client.subscribe(remoteStream, function (err) {
          console.log("stream subscribe failed", err);
        })
      }
    });
    rtc.client.on("stream-subscribed", function (evt) {
      var remoteStream = evt.stream;
      remoteVideo.current.srcObject = remoteStream.stream
    })
    rtc.client.on("stream-removed", function (evt) {
      var remoteStream = evt.stream;
    })
  }
  const close = () => {
    rtc.client.leave(function () {
      rtc.localStream.stop();
      rtc.localStream.close();
      while (rtc.remoteStreams.length > 0) {
        var stream = rtc.remoteStreams.shift();
        stream.stop();
      }
    }, function (err) {
      console.error(err);
    })
    props.onRefuse({ video: false })
  }
  return (
    <div className='video' >
      <div hidden={success}>
        <div className='video_img'>
          <img src={props.user.avatar} alt=''></img>
        </div>
        <p className='video_title'>{props.user.username}</p>
      </div>
      {
        operation ?
          <div className='video_operation' >
            <Button
              className='oper'
              icon={<span className='iconfont icon-faxian'></span>}
              inline
              disabled={!success}
            ></Button>
            <Button
              className='oper refuse'
              icon={<span className='iconfont icon-guaduan'></span>}
              inline
              disabled={!success}
              onClick={() => {
                io.emit('refuseVideo', { from: props.user._id })
                close()
              }}
            ></Button>
            <Button
              className='oper'
              icon={<span className='iconfont icon-faxian'></span>}
              inline
              disabled={!success}
            ></Button>
          </div>
          :
          <div className='video_operation'>
            <Button
              className='oper agree'
              icon={<span className='iconfont icon-shipin'></span>}
              inline
              onClick={() => {
                setOperation(true)
                fn()
              }}
            ></Button>
            <Button
              className='oper refuse'
              icon={<span className='iconfont icon-shipin'></span>}
              inline
              onClick={() => {
                io.emit('refuseVideo', { from: props.user._id })
                props.onRefuse({ video: false })
              }}
            ></Button>
          </div>
      }
      <video ref={remoteVideo} autoPlay className={exchange ? 'remoteVideo' : 'localVideo'} onClick={() => setExChange(!exchange)}></video>
      <video ref={localVideo} autoPlay className={exchange ? 'localVideo' : 'remoteVideo'} onClick={() => setExChange(!exchange)}></video>
      {
        !success ?
          <audio src='http://cdn.goodluck.video/call.mp3' autoPlay loop></audio> : ''
      }
    </div >
  )
}
export default CallVideo