import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../reducer'
import api from '../../api'
import { InfoMeg } from '../../components'
import './style.less'
const Message = (props) => {
  const [state, dispatch] = useContext(AppContext)
  useEffect(() => {
    mes()
  }, [])
  function mes() {
    api.messageFindId( state.id ).then(res => {
      console.log(res.list)
      dispatch({
        type: 'setMessageList',
        payload: { messageList: res.list }
      })
    })
  }
  return state.messageList ? (
    <div className='message'>
      {state.messageList.map((item, index) => {
        return <InfoMeg list={item} key={index} onValueId={(e) => {
          console.log(e)
          props.history.push(`/chat/${e.name}/${e.id}`)
        }} />
      })}

    </div>
  ) : ''
}
export default Message