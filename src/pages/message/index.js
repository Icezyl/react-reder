import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../reducer'
import api from '../../api'
import { InfoMeg } from '../../components'
import './style.less'
import { NavBar, SearchBar } from 'antd-mobile'
const Message = (props) => {
  const [state, dispatch] = useContext(AppContext)
  return (
    <div className='message'>
      <NavBar mode='light'
        rightContent={[
          <div className='message_friend' key='0' onClick={() => props.history.push('/friend')}><span className='iconfont icon-wodeguanzhu'></span> 关注</div>
        ]}
      >聊天</NavBar>
      <SearchBar placeholder='搜索' onFocus={() => { props.history.push('/search') }} />
      {state.messageList ? state.messageList.map((item, index) => {
        return <InfoMeg list={item} id={state.id} key={index} count={
          api.countSee({ id: item._id, to: state.id }).then(res => {
            return res.count
          })
        } onValueId={(id) => {
          props.history.push(`/chat/${id}`)
        }} />
      }) : ''}
    </div>
  )
}
export default Message