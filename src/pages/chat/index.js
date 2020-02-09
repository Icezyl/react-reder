import React, { useState, useContext } from 'react'
import { NavBar, Icon, Button } from 'antd-mobile'
import ws from '../../ws'
import { AppContext } from '../../reducer'
import api from '../../api'
import './style.less'
const Chat = (props) => {
  const [state] = useContext(AppContext)
  const [value, setValue] = useState('')
  const [list, setList] = useState()
  function onSend() {
    ws.send({ sendId: state.id, text: value, receiveId: props.match.params.id })
    setValue('')
  }
  function Msg() {

  }
  return (
    <div className='chat'>
      <NavBar
        icon={<Icon type="left" />}
        onLeftClick={() => props.history.go(-1)}
      >{props.match.params.name}</NavBar>
      Chat
      <div className='send'>
        <input className='send_text' value={value} type='text' onKeyDown={(e) => {
          if (e.keyCode === 13) { onSend() }
        }} onChange={(e) => { setValue(e.target.value) }}></input>
        <Button type='primary' className='send_button' size='small' onClick={onSend} inline>发送</Button>
      </div>
    </div >
  )
}
export default Chat