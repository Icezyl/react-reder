import React, { useState, useEffect, useContext } from 'react'
import { NavBar, Icon, TextareaItem, ImagePicker, Toast, Button } from 'antd-mobile'
import api from '../../api'
import { AppContext } from '../../reducer'
import './style.less'
const Feedback = props => {
  const [state, dispatch] = useContext(AppContext)

  const [value, setValue] = useState()
  const [data, setData] = useState([])
  const [token, setToken] = useState()
  const onChange = (files) => {
    setData(files)
  }
  useEffect(() => {
    api.yunToken().then(res => {
      setToken(res.token)
    })
  })
  const onSend = () => {
    var imgs = []
    if (data.length) {
      data.forEach((item, index) => {
        let formData = new FormData()
        formData.append('file', item.file)
        formData.append('token', token)
        api.yunLoad(formData).then(res => {
          imgs.push('http://cdn.goodluck.video/' + res.hash)
          if (index === data.length - 1) {
            send({ userId: state.id, imgs: imgs, content: value })
          }
        })
      })
    } else {
      if (value) {
        send({ userId: state.id, content: value })
      } else {
        Toast.info('内容为空无法发布', 2, null, false)
      }
    }
  }
  const send = (data) => {
    api.addFeedback(data).then(res => {
      if (res.ok) {
        Toast.info('发送成功', 2, null, false)
        props.history.push('/dynamic')
      }
    })
  }
  return (
    <div className='feedback'>
      <NavBar
        icon={<Icon type="left" />}
        onLeftClick={() => props.history.go(-1)}
        mode='light'>意见反馈</NavBar>
      <TextareaItem
        rows={5}
        placeholder={'请补充详细问题和意见'}
        onChange={(e) => {
          setValue(e)
        }} />
      <ImagePicker
        files={data}
        onChange={onChange}
        selectable={data.length < 4}
        multiple
      />
      <p className='feedback_but'><Button type='primary' onClick={onSend}>提交</Button></p>
    </div >
  )
}
export default Feedback