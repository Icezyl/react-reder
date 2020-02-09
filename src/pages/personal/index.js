import React, { useContext, useEffect, useState } from 'react'
import { Result, NavBar, Button, Icon, Toast } from 'antd-mobile'
import api from '../../api'
import './style.less'
import { AppContext } from '../../reducer'
const Personal = (props) => {
  const [state] = useContext(AppContext)
  const [data, setData] = useState()
  useEffect(() => {
    userInfo()
  }, [])

  function userInfo() {
    api.personal(state.id, props.match.params.id).then(res => {
      console.log(res.data)
      setData(res.data)
    })
  }
  function onButton(success) {
    if (success) {
      console.log(1)
      props.history.push(`/chat/${data.userinfo.username}/${props.match.params.id}`)
      // 跳转xx
    } else {
      api.add(state.id, props.match.params.id).then(res => {
        Toast.info(res.msg, 2, null, false)
      })
    }
  }
  console.log(data)
  return data ? (
    <div className='personal'>
      <NavBar
        icon={<Icon type="left" />}
        onLeftClick={() => {
          props.history.go(-1)
        }}
      >个人资料</NavBar>
      <Result
        img={<img src={data.userinfo.avatar} alt='' className='result_img'></img>}
        title={data.userinfo.username}
        message={<div>{data.userinfo.sex ? '男' : '女'}</div>}
      ></Result>

      <div className='button'>
        <Button type='primary' onClick={() => {
          console.log(data)
          onButton(data.success)
        }}>
          {data.success ? '发消息' : '加好友'}</Button>
      </div>
    </div>
  ) : ''
}
export default Personal