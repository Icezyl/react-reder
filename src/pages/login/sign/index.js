import React, { useState, useContext } from 'react'
import './style.less'
import { InputItem, Button, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import api from '../../../api'
import io from '../../../io'
import { AppContext } from '../../../reducer'
const Login = (props) => {
  const [state, dispatch] = useContext(AppContext)
  const [email, setEmail] = useState()
  const [paw, setPaw] = useState()
  function login() {
    api.login({ email, password: paw }).then(res => {
      Toast.info(res.msg, 2, null, false)
      dispatch({
        type: 'setToken',
        payload: { token: res.token, id: res.user._id, user: res.user }
      })
      api.messageFindId(res.user._id).then(res => {
        dispatch({
          type: 'setMessageList',
          payload: { messageList: res.list }
        })
      })
      api.allSee(res.user._id).then(res => {
        dispatch({
          type: 'setAddBadge',
          payload: { badge: res.count }
        })
      })
      props.history.push('/')
    })
  }
  return (
    <div className="sign">
      <h1>Reder</h1>
      <InputItem clear className="sign-input" placeholder="请输入邮箱" value={email} onChange={(e) => (setEmail(e))} />
      <InputItem type="password"
        className="sign-input" placeholder="请输入密码" value={paw} onChange={(e) => (setPaw(e))} onKeyDown={(e) => {
          if (e.keyCode === 13) { login() }
        }} />
      <div className="sign-help"><Link to="/login/retrieve">忘记密码</Link><Link to="/login/reg">用户注册</Link></div>
      <Button type="primary" style={{ 'borderRadius': '5rem', "border": '1px solid #EEE' }} onClick={login} disabled={!(email && paw)}>登录</Button>
    </div>
  )
}

export default Login