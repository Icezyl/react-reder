import React, { useState } from 'react'
import './style.less'
import { InputItem, Button, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import api from '../../../api'
const Reg = (props) => {
  const [name, setName] = useState()
  const [paw, setPaw] = useState()
  function res() {
    api.res(name, paw).then(res => {
      Toast.info(res.msg,2,null,false)
      if (res.code === 0) {
        props.history.push('/login')
      }
    })
  }
  return (
    <div className="reg">
      <h1>注册</h1>
      <InputItem clear className="reg-input" placeholder="请输入用户名" value={name} onChange={(e) => (setName(e))} />
      <InputItem type="password"
        className="reg-input" placeholder="请输入密码" value={paw} onChange={(e) => (setPaw(e))} />
      <div className="reg-help"><Link to="/login">已有账号登录</Link></div>
      <Button type="primary" style={{ 'borderRadius': '5rem', "border": '1px solid #EEE' }} onClick={res} disabled={!(name && paw)}>注册</Button>
    </div>
  )
}

export default Reg