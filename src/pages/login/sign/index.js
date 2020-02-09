import React, { useState, useContext } from 'react'
import './style.less'
import { InputItem, Button, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import api from '../../../api'
import { AppContext } from '../../../reducer'
import ws from '../../../ws'
const Login = (props) => {
  const [state, dispatch] = useContext(AppContext)
  const [name, setName] = useState()
  const [paw, setPaw] = useState()
  function login() {
    api.login(name, paw).then(res => {
      Toast.info(res.msg, 2, null,false)
      if (res.code === 0) {
        ws.open(res.data._id)
        dispatch({
          type: 'setToken',
          payload: { token: res.token, id: res.data._id }
        })
        console.log(state)
        props.history.push('/')
      }
    })
  }
  return (
    <div className="sign">
      <h1>Reder聊天室</h1>
      <InputItem clear className="sign-input" placeholder="请输入用户名" value={name} onChange={(e) => (setName(e))} />
      <InputItem type="password"
        className="sign-input" placeholder="请输入密码" value={paw} onChange={(e) => (setPaw(e))} />
      <div className="sign-help"><Link to="login" onClick={() => {
        Toast.info('暂时无法访问')
      }}>忘记密码</Link><Link to="/login/reg">用户注册</Link></div>
      <Button type="primary" style={{ 'borderRadius': '5rem', "border": '1px solid #EEE' }} onClick={login} disabled={!(name && paw)}>登录</Button>
    </div>
  )
}

export default Login