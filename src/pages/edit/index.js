import React, { useContext, useEffect, useState, useRef } from 'react'
import { NavBar, DatePicker, Picker, InputItem, List, Modal, Icon, Button, Toast } from 'antd-mobile'
import { AppContext } from '../../reducer'
import api from '../../api'
import './style.less'
const Edit = (props) => {
  const alert = Modal.alert
  const Item = List.Item
  const [count, setCount] = useState(0)
  const [state, dispatch] = useContext(AppContext)
  const [user, setUser] = useState({})
  const [sValue, setsValue] = useState([])
  const file = useRef()
  useEffect(() => {
    userFind()
  }, [])
  function userFind() {
    api.users({ _id: state.id }).then((res) => {
      setUser(res.user)
      setsValue([res.user.sex])
    })
  }
  function update(data) {
    api.update(state.id, data).then(res => {
      Toast.info('修改成功', 2, null, false)
      props.history.go(-1)
    })
  }
  function onChange(e) {
    if (e.target.files.length) {
      var formData = new FormData()
      formData.append('file', e.target.files[0])
      api.yunToken().then(res => {
        formData.append('token', res.token)
        api.yunLoad(formData).then(res => {
          let img = 'http://cdn.goodluck.video/' + res.hash
          console.log(img)
          setUser({ ...user, avatar: img })
          setCount(count + 1)
        })
      })
    }
  }
  return user ? (
    <div className='edit'>
      <NavBar
        leftContent={<Icon type="left" />}
        onLeftClick={() => {
          if (count) {
            alert('Delete', '确定返回吗?当前资料修改尚未保存,返回所有修改不会生效', [
              { text: '取消', onPress: () => console.log('cancel') },
              { text: '确定', onPress: () => props.history.go(-1) },
            ])
          }else {
            props.history.go(-1)
          }
        }}
        rightContent={[
          <span key='0' onClick={() => {
            if (count) {
              update(user)
              setCount(0)
            }
          }}>保存</span>
        ]}
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
          <InputItem
            placeholder="start from right"
            value={user.username}
            onChange={(e) => {
              setUser({ ...user, username: e })
              setCount(count + 1)
              console.log(count)
            }}
          >
            名称
          </InputItem>
          <Picker extra="请选择(可选)"
            data={[[{ value: 0, label: '女' }, { value: 1, label: '男' }]]}
            title="请选择"
            cascade={false}
            value={sValue}
            onOk={e => {
              setsValue(e)
              setCount(count + 1)
              setUser({ ...user, sex: e[0] })
            }}
          >
            <Item>性别</Item>
          </Picker>
          <DatePicker
            minDate={new Date(1920, 1, 1)}
            mode="date"
            title="请选择出生日期"
            value={new Date(user.birthday)}
            onChange={date => {
              setCount(count + 1)
              setUser({ ...user, birthday: date })
            }}
          >
            <Item>出生</Item>
          </DatePicker>
          <InputItem placeholder="填写简介更容易获得关注哦~" value={user.introduction} onChange={(e) => {
            setCount(count + 1)
            setUser({ ...user, introduction: e })
          }} >
            简介
          </InputItem>
        </List>
      </div>
    </div >
  ) : ''
}
export default Edit