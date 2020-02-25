import React, { useContext, useEffect, useState } from 'react'
import { List } from 'antd-mobile'
import { AppContext } from '../../reducer'
import api from '../../api'
import ws from '../../ws'
import './style.less'

const Item = List.Item;
const My = () => {
  const [state, dispatch
  ] = useContext(AppContext)
  const [user, setUser] = useState()
  useEffect(() => {
    api.users({ _id: state.id }).then(res => {
      setUser(res.user)
    })
  }, [state.id])
  function send() {
    ws.send({ sendId: '123', receiveId: '321', text: '222' }, dispatch)
  }
  return user ? (
    <div className='my'>
      <div className='my_tab' onClick={() => { console.log(1) }}>
        <div className='my_img'>
          <img src={user.avatar} alt="" />
        </div>
        <div className='my_text'>
          <h1>{user.username}</h1>
          <p>ddd</p>
        </div>
      </div>
      <List renderHeader={() => 'Icon in the left'}>
        <Item
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
          onClick={() => { send() }}
        >消息中心</Item>
        <Item
          thumb="http://localhost:5000/setting.png"
          onClick={() => { }}
        >My Cost Ratio</Item>
        <Item
          thumb="http://localhost:5000/setting.png"
          onClick={() => { }}
        ></Item>
        <Item
          thumb="http://localhost:5000/setting.png"
          onClick={() => { }}
        >意见反馈</Item>
        <Item
          thumb="http://localhost:5000/setting.png"
          onClick={() => { }}
        >设置</Item>
      </List>
    </div>
  ) : ''
}
export default My