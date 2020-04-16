import React, { useContext, useEffect, useState, memo } from 'react'
import { List, Icon, NavBar } from 'antd-mobile'
import { AppContext } from '../../reducer'
import api from '../../api'
import ws from '../../io'
import './style.less'

const Item = List.Item;
const My = (props) => {
  const [state, dispatch] = useContext(AppContext)
  const [user, setUser] = useState()
  useEffect(() => {
    api.users({ _id: state.id }).then(res => {
      console.log(res)
      setUser(res.user)
    })
  }, [state.id])
  const send = () => {
    ws.send({ sendId: '123', receiveId: '321', text: '222' }, dispatch)
  }
  return user ? (
    <div className='my'>
      <NavBar>我</NavBar>
      <div className='my_tab' onClick={() => { props.history.push(`/myHome/${state.id}`) }}>
        <div className='my_img'>
          <img src={user.avatar} alt="" />
        </div>
        <div className='my_text'>
          <h1>{user.username}</h1>
          <p>邮箱: {user.email}</p>
        </div>
      </div>
      <List renderHeader={() => ''}>
        <Item
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
          onClick={() => { send() }}
        >消息中心</Item>
        <Item
          thumb="http://localhost:5000/setting.png"
          onClick={() => { props.history.push('/feedback') }}
        >意见反馈</Item>
        <Item
          thumb="http://localhost:5000/setting.png"
          onClick={() => { props.history.push('/setting') }}
        >设置</Item>
      </List>
    </div>
  ) : ''
}
export default memo(My)