import React, { useContext, useEffect } from 'react'
import io from '../../io'
import { AppContext } from '../../reducer'
import { Button } from 'antd-mobile'
import api from '../../api'

const Matching = props => {
  const [state, dispatch] = useContext(AppContext)
  io.on('successVoice', data => {
    console.log(data)
    props.history.replace(`/voice/${data.channel}/${data.id}`)
  })
  useEffect(() => {
    io.emit('voice', { id: state.id, sex: state.user.sex })
    let gg = setTimeout(() => {
      remove()
    }, 60000)
    return () => { clearTimeout(gg) }
  }, [])
  const remove = () => {
    io.emit('removeVoice', { id: state.id, sex: state.user.sex })
    props.history.go(-1)
  }
  return (
    <div style={{ textAlign: 'center', height: '100%', padding: '20px 0', background: '#FEFFF9' }}>
      <img src='http://cdn.goodluck.video/bag.png' style={{ width: '100%' }} alt=''></img>
      <Button inline size='small' onClick={remove}>取消匹配</Button>
      <audio src='http://cdn.goodluck.video/call.mp3' autoPlay loop></audio>
    </div>
  )
}
export default Matching