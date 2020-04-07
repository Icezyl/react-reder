import React, { useState, useEffect, useRef } from 'react'
import { InputItem, Button, Toast, Icon } from 'antd-mobile'
import api from '../../../api'
import './style.less'
const Retrieve = () => {
  const [email, setEmail] = useState()
  const [code, setCode] = useState()
  const [paw, setPaw] = useState()
  const [time, setTime] = useState(60)
  const [off, setOff] = useState(false)
  let interval = useRef();
  function send(email) {
    api.sendEmail({ email }).then(res => {
      setOff(true)
    })
  }
  function determine(data) {
    api.retrieve(data).then(res => {
      Toast.info('修改成功', 2, null, false)
      setEmail('')
      setCode('')
      setPaw('')
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
    <div className='retrieve'>
      <h1>找回密码</h1>
      <InputItem className='retrieve_email' placeholder='请输入邮箱' value={email} onChange={(e) => (setEmail(e))} >
        <span className={off ? 'reg_code code_active' : 'reg_code'} onClick={() => {
          if (email) {
            if (!time >= 0) { send(email) }
          } else {
            Toast.info('邮箱不能为空', 2, null, false)
          }
        }}>{off ? `重新发送(${time})` : '获取验证码'}</span>
      </InputItem>
      <InputItem
        placeholder='请输入验证码'
        value={code}
        onChange={(e) => (setCode(e))}
      ></InputItem>
      <InputItem
        placeholder='请输入密码'
        value={paw}
        onChange={(e) => (setPaw(e))}
      ></InputItem>
      <Button type="primary" style={{ 'borderRadius': '5rem', "border": '1px solid #EEE' }} onClick={() => { determine({ password: paw, email, code }) }} disabled={!(email && code && paw)}>确定</Button>
    </div>
  )
}
export default Retrieve