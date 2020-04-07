import React, { useState, useRef, useEffect } from 'react'
import AgoraRTC from 'agora-rtc-sdk'
import api from '../../api'
import io from '../../io'
import './style.less'
import { Button } from 'antd-mobile'
const CallAudio = props => {
  const remoteAudio = useRef()
  const [operation, setOperation] = useState(props.operation)
  const [success, setSuccess] = useState(false)
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
  const [but, setBut] = useState()
  useEffect(() => {
    api.generateRtcToken({ channelName: option.channel }).then(res => {
      setOption({ ...option, token: res.key })
    })
    let time = setTimeout(() => {
      console.log(remoteAudio)
      if (!operation) {
        io.emit('refuseAudio', { from: props.user._id })
        props.onRefuse({ audio: false })
      }
    }, 60000)
    return () => { clearTimeout(time) }
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
  io.on('refuseAudio', data => {
    if (success) {
      close()
    } else {
      props.onRefuse({ audio: false })
    }
  })
  const fn = () => {
    rtc.client.init(option.appID, function () {
      rtc.client.join(option.token, option.channel, null, function (uid) {
        let localStream = AgoraRTC.createStream({
          streamID: uid,
          audio: true,
          video: false,
          screen: false,
        })
        setRtc({ ...rtc, params: { uid: uid }, localStream: localStream })
        localStream.init(function () {
          if (props.call) {
            io.emit('callAudio', { channel: option.channel, id: props.user._id, from: props.id })
          }
          setSuccess(true)
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
      var id = remoteStream.getId();
      remoteAudio.current.srcObject = remoteStream.stream
    })
    rtc.client.on("stream-removed", function (evt) {
      var remoteStream = evt.stream;
      var id = remoteStream.getId();
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
    props.onRefuse({ audio: false })
  }
  return (
    <div className='audio'>
      <div className='audio_img'>
        <img src={props.user.avatar} alt=''></img>
      </div>
      <p className='audio_title'>{props.user.username}</p>
      {
        operation ?
          <div className='audio_operation' >
            <Button
              className='oper'
              icon={<span className='iconfont icon-maikefeng'></span>}
              inline
              disabled={!success}
            ></Button>
            <Button
              className='oper refuse'
              icon={<span className='iconfont icon-guaduan'></span>}
              inline
              disabled={!success}
              onClick={() => {
                io.emit('refuseAudio', { from: props.user._id })
                close()
              }}
            ></Button>
            <Button
              className='oper'
              icon={<span className='iconfont icon-gonggao'></span>}
              inline
              disabled={!success}
            ></Button>
          </div>
          :
          <div className='audio_operation'>
            <Button
              className='oper agree'
              icon={<span className='iconfont icon-dianhua1'></span>}
              inline
              onClick={() => {
                setOperation(true)
                fn()
              }}
            ></Button>
            <Button
              className='oper refuse'
              icon={<span className='iconfont icon-guaduan'></span>}
              inline
              onClick={() => {
                io.emit('refuseAudio', { from: props.user._id })
                props.onRefuse({ audio: false })
              }}
            ></Button>
          </div>
      }
      <audio ref={remoteAudio} autoPlay controls></audio>
      {
        !success ?
          <audio src='http://cdn.goodluck.video/call.mp3' autoPlay loop></audio> : ''
      }
    </div >
  )
}
export default CallAudio