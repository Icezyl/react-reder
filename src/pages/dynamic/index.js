import React, { useState, lazy } from 'react'
import { Tabs, Button } from 'antd-mobile'
import './style.less'
const Dynamic = props => {
  const Index = lazy(() => import('./dy'))
  const [sen, setSen] = useState([
    { title: '关注' },
    { title: '推荐' }
  ])
  return (
    <div className='dynamic'>
      <Tabs
        tabs={sen}
        initialPage={1}
      >
        <div className='dynamic_box'><Index follow></Index></div>
        <div className='dynamic_box'><Index></Index></div>
      </Tabs>
      <Button size='small' className='dynamic_add' type='primary' style={{ position: 'fixed' }} inline onClick={() => { props.history.push('/send') }}>发动态</Button>
    </div>
  )
}
export default Dynamic