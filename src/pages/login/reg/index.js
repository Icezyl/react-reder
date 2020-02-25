import React, { useState, useEffect, useRef } from 'react'
import './style.less'
import { InputItem, Button, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import api from '../../../api'
const Reg = (props) => {
  const [name, setName] = useState()
  const [paw, setPaw] = useState()
  const [email, setEmail] = useState()
  const [code, setCode] = useState()
  const [time, setTime] = useState(60)
  const [off, setOff] = useState(false)
  let interval = useRef();
  function send(email) {
    api.sendEmail({ email }).then(res => {
      console.log(res)
    })
  }
  function res() {
    api.res({ username: name, passoword: paw }).then(res => {
      Toast.info(res.msg, 2, null, false)
      if (res.code === 0) {
        setName('')
        setPaw('')
        props.history.push('/login')
      }
    })
  }
  useEffect(() => {
    if (off) {
      interval.current = setInterval(() => {
        setTime(t => t - 1)
      }, 1000)
    }
    return () => clearInterval(interval.current)
  }, [off])
  useEffect(() => {
    if (time === 0) {
      setOff(false)
      setTime(60)
    }
  }, [time])
  return (
    <div className="reg">
      <h1>注册</h1>
      <InputItem clear className="reg-input" placeholder="请输入用户名" value={name} onChange={(e) => (setName(e))} />
      <InputItem type="password"
        className="reg-input" placeholder="请输入密码" value={paw} onChange={(e) => (setPaw(e))} />
      <InputItem className="reg_email" placeholder="请输入邮箱" value={email} onChange={(e) => (setEmail(e))} >
        <span className={off ? 'reg_code code_active' : 'reg_code'} onClick={() => {
          if (time) {
            setOff(true)
            if (time > 0) {
              send(email)
            }
          }
        }}>获取验证码{off ? time + 's' : ''}</span>
      </InputItem>
      <InputItem clear className="reg-input" placeholder="请输入验证码" value={code} onChange={(e) => (setCode(e))} />
      <div className="reg-help"><Link to="/login">已有账号登录</Link></div>
      <Button type="primary" style={{ 'borderRadius': '5rem', "border": '1px solid #EEE' }} onClick={res} disabled={!(name && paw)}>注册</Button>
    </div>
  )
}

export default Reg