import React from 'react'
import Box from './Box'
import { NavBar, Icon, Tabs } from 'antd-mobile'
import './style.less'
import { Route } from 'react-router-dom'
const Friends = (props) => {
  const tabs = [
    { title: <div>我关注</div>, path: '/follow' },
    { title: '好友', path: '' },
    { title: '关注我', path: '/fans' },
  ]
  return (
    <div className='friend'>
      <NavBar mode='light'
        onLeftClick={() => props.history.push('/message')}
        icon={<Icon type="left" />}
      >关注列表</NavBar>
      <Tabs
        tabs={tabs} initialPage={1}
        onChange={e => {
          props.history.push('/friend' + e.path)
        }}
      >
        <Route path='/friend/follow' component={Box}></Route>
        <Route path='/friend' component={Box}></Route>
        <Route path='/friend/fans' component={Box}></Route>
      </Tabs>
    </div>
  )
}

export default Friends