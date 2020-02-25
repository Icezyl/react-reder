import React, { useContext, useEffect, useState, useRef } from 'react'
import { NavBar, DatePicker, List, Icon } from 'antd-mobile'
import { AppContext } from '../../reducer'
import api from '../../api'
import moment from 'moment'
import axios from 'axios'
import './style.less'
const Edit = (props) => {
  const Item = List.Item
  const [state, dispatch] = useContext(AppContext)
  const [user, setUser] = useState({})
  const file = useRef()
  useEffect(() => {
    userFind()
  }, [])
  function userFind() {
    api.users({ _id: state.id }).then((res) => {
      setUser(res.user)
    })
  }
  function update(data) {
    api.update(state.id, data).then(res => {
      console.log(res)
    })
  }
  function onChange(e) {
    if (e.target.files.length) {
      var formData = new FormData()
      formData.append('file', e.target.files[0])
      api.yunToken().then(res => {
        formData.append('token', res.token)
        api.yunLoad(formData).then(res => {
          let img = 'http://q5y12w23r.bkt.clouddn.com/' + res.hash
          setUser({ ...user, avatar: img })
          update({ avatar: img })
        })
      })
    }
  }
  return user ? (
    <div className='edit'>
      <NavBar
        leftContent={<Icon type="left" />}
        onLeftClick={() => { props.history.go(-1) }}
      >修改资料</NavBar>
      <div>
        <List>
          <Item
            onClick={() => { file.current.click() }}
            className='edit_avatar'
          >
            <div className='edit_img'>
              <img src={user.avatar} alt=''></img>
              <input name="file" ref={file} hidden type="file" accept='.jpg,.png' onChange={(e) => {
                onChange(e)
              }} />
              <span className='edit_title'>修改头像</span>
            </div>
          </Item>
          <Item extra={user.username}><span className='edit_title'>昵称</span></Item>
          <Item extra={user.sex ? '男' : '女'}><span className='edit_title'>性别</span></Item>
          <DatePicker
            minDate={new Date(1920, 1, 1)}
            mode="date"
            title="请选择出生日期"
            value={new Date(user.birthday)}
            onChange={date => {
              setUser({ ...user, birthday: date })
              update({ birthday: date })
            }}
          >
            <Item><span className='edit_title'>出生</span></Item>
          </DatePicker>
          <Item extra={user.introduction ? user.introduction : '未填写'}><span className='edit_title'>简介</span></Item>
        </List>
      </div>
    </div>
  ) : ''
}
export default Edit