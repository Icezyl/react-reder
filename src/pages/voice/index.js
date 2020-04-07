import React, { useContext, useEffect, useState, useRef } from 'react'
import { Button } from 'antd-mobile'
import { AppContext } from '../../reducer'
import io from '../../io'
import api from '../../api'
import AgoraRTC from 'agora-rtc-sdk'
import './style.less'
const Voice = props => {
  console.log(props)
  const [state, dispatch] = useContext(AppContext)
  const remoteAudio = useRef(0)
  const [user, setUser] = useState()
  const [success, setSuccess] = useState(false)
  const [option, setOption] = useState({
    appID: "34dac50c186e449eb7e1224608bc3fba",
    channel: props.match.params.channel,
    uid: '',
    token: '',
    id: props.match.params.id
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
    let gg = ''
    if (option.token) {
      fn()
      gg = setTimeout(() => {
        api.users({ _id: option.id }).then(res => {
          setUser(res.user)
        })
        io.emit('add', { id: option.channel })
      }, 60000)
    }
    return () => {
      clearTimeout(gg)
    }
  }, [option.token])
  io.on('refuseAudio', data => {
    if (success) {
      close()
    } else {
      props.history.push('/')
    }
  })
  const close = () => {
    rtc.client.leave(function () {
      rtc.localStream.stop();
      rtc.localStream.close();
      while (rtc.remoteStreams.length > 0) {
        var stream = rtc.remoteStreams.shift();
        stream.stop();
      }
      props.history.push('/')
    }, function (err) {
      console.error(err);
    })

  }
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
  return (
    <div className='voice'>
      <div className='voice_img'>
        <img src={user ? user.avatar : ''} alt=''></img>
      </div>
      <div className='voice_operation' >
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
            io.emit('refuseAudio', { from: option.id })
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
      <audio ref={remoteAudio} autoPlay controls></audio>
    </div>
  )
}
export default Voice