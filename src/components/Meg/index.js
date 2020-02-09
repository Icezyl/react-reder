import React from 'react';
import './style.less'
import { Button } from 'antd-mobile';
const Meg = (props) => {
  // console.log(props)
  return (
    <div className={!props.button ? 'on mey' : 'mey'} onClick={() => {
      if (props.onValueId) {
        props.onValueId(props.list._id)
      }
    }}>
      <div className='mey_headerImg'>
        <img src={props.list.avatar} alt="" style={{ height: '100%', width: '100%' }} />
      </div>
      <div className='mey_text'>
        <p>{props.list.username}</p>
      </div>
      {props.button ? (<div className='mey_agree'><Button className='button' size='small' onClick={() => {
        props.onButton(props.buid)
      }}>{props.success === 0 ? '同意' : '已同意'}</Button></div>) : ''}
    </div>
  )
}

export default Meg