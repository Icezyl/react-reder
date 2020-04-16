import React, { useContext } from 'react'
import { NavBar, Icon, List, Button } from 'antd-mobile'
import './style.less'
import { AppContext } from '../../reducer'
import io from '../../io'
const Item = List.Item
const Setting = props => {
  const [state, dispatch] = useContext(AppContext)
  const email = (em) => {
    let index = em.indexOf('@')
    return em.substr(0, 3) + '***' + em.substr(index - 2, 2) + em.substr(index)
  }
  return (
    <div className='setting'>
      <NavBar
        icon={<Icon type="left" />}
        onLeftClick={() => props.history.go(-1)}
        mode='light'>设置</NavBar>
      <List renderHeader>
        <Item arrow='horizontal' extra="未认证">手机号</Item>
        <Item arrow='horizontal' extra={email(state.user.email)}>邮箱</Item>
        <Item arrow='horizontal'>账号安全</Item>
      </List>
      <p className='edition'>V1.40.0-20022501</p>
      <Button className='setting_out' onClick={() => {
        dispatch({
          type: 'clearOut'
        })
        io.emit('disconnection', { id: state.id })
      }}>退出登录</Button>
    </div >
  )
}
export default Setting