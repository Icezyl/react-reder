import React, { useContext, useEffect, useState } from 'react'
import { Result, List } from 'antd-mobile'
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
    api.userFind(state.id).then(res => {
      console.log(res.data.user)
      setUser(res.data.user)
    })
  }, [state.id])
  function send() {
    ws.send({ sendId: '123', receiveId: '321', text: '222' }, dispatch)
  }
  return user ? (
    <div>
      <Result
        img={<img className='result_img' src={user.avatar} alt='' />}
        title={user.username}
      ></Result>
      <List renderHeader={() => 'Icon in the left'}>
        <Item
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
          arrow="horizontal"
          onClick={() => { send() }}
        >My wallet</Item>
        <Item
          thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
          onClick={() => { }}
          arrow="horizontal"
        >
          My Cost Ratio
        </Item>
      </List>
    </div>
  ) : ''
}
export default My