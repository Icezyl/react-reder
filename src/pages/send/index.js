import React, { useState, useContext, useEffect, useRef } from 'react'
import { NavBar, Icon, TextareaItem, ImagePicker, Toast } from 'antd-mobile'
import { AppContext } from '../../reducer'
import api from '../../api'
import './style.less'
const Send = props => {
  const [state, dispatch] = useContext(AppContext)
  const [token, setToken] = useState()
  const [value, setValue] = useState()
  const [data, setData] = useState([])
  useEffect(() => {
    api.yunToken().then(res => {
      setToken(res.token)
    })
  })
  function onChange(files) {
    setData(files)
  }
  function onSend() {
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
  function send(data) {
    api.dySend(data).then(res => {
      if (res.ok) {
        Toast.info('发送成功', 2, null, false)
        props.history.push('/dynamic')
      }
    })
  }
  return (
    <div className='send'>
      <NavBar
        mode='light'
        rightContent={[
          <span key='0' onClick={onSend}>发布</span>
        ]}
        onLeftClick={() => { props.history.go(-1) }}
        icon={<Icon type='cross' />}
      />
      <TextareaItem
        autoHeight
        count={500}
        placeholder={'此刻你想说...'}
        onChange={(e) => {
          setValue(e)
        }}
      />
      <ImagePicker
        files={data}
        onChange={onChange}
        selectable={data.length < 4}
        multiple
      />
    </div>
  )
}
export default Send