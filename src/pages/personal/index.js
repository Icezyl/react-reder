import React, { useContext, useEffect, useState } from 'react'
import { Result, NavBar, Button, Icon, Toast } from 'antd-mobile'
import api from '../../api'
import './style.less'
import { AppContext } from '../../reducer'
const Personal = (props) => {
  const [state] = useContext(AppContext)
  const [data, setData] = useState()
  useEffect(() => {
    user()
  }, [])

  function user() {
    api.personal({ myId: state.id, youId: props.match.params.id }).then(res => {
      console.log(res)
      setData(res)
    })
  }
  function onButton(success) {
    if (success) {
      props.history.push(`/chat/${data.user.username}/${props.match.params.id}`)
    } else {
      api.add({ myId: state.id, youId: props.match.params.id }).then(res => {
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
        img={<img src={data.user.avatar} alt='' className='result_img'></img>}
        title={data.user.username}
        message={<div>{data.user.sex ? '男' : '女'}</div>}
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