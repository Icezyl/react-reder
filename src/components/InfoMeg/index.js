import React, { useState, useEffect } from 'react';
import api from '../../api'
import './style.less'
const InfoMeg = (props) => {
  const [count, setCount] = useState()
  const [user, setUser] = useState()
  useEffect(() => {
    if (props.id === props.list.arr.to) {
      fun(props.list.arr.from)
    } else {
      fun(props.list.arr.to)
    }
  }, [])
  useEffect(() => {
    if (props.list._id) {
      api.countSee({ id: props.list._id, to: props.id }).then(res => {
        setCount(res.count)
      })
    }
  }, [props])
  function fun(id) {
    api.users({ _id: id }).then(res => {
      setUser(res.user)
    })
  }
  function time(time) {
    let date = new Date()
    let newtime = new Date(time)
    let year = newtime.getFullYear()
    let month = newtime.getMonth() + 1
    let day = newtime.getDate()
    let hour = newtime.getHours()
    let second = newtime.getSeconds()
    let ji = '星期' + ('日一二三四五六'.charAt(newtime.getDay()))
    let times = ''
    let sjc = ((date.getTime() - newtime.getTime()) / (1000 * 60 * 60 * 24))
    if (sjc < 7) {
      if (day === date.getDate()) {
        times = `${hour}:${second}`
      } else {
        times = ji
      }
    } else {
      times = `${year}-${month}-${day}`
    }
    return times
  }
  return user ? (
    <div className='infomey' onClick={() => { props.onValueId(user._id) }}>
      <div className='infomey_headerImg'>
        <img src={user.avatar} alt="" />
        {user.state ? <span className='infomey_state'></span> : ''}
      </div>
      <div className='infomey_text'>
        <div className='infomey_top'>
          <p className='infomey_name'>{user.username}</p>
          <span className='infomey_time'>{time(props.list.arr.created)}</span>
        </div>
        <div className='infomey_bottom'>
          <span className='infomey_newtext'>{props.list.arr.content}</span>
          {count === 0 ? '' : <span className='infomey_see'>{count > 99 ? '99+' : count}</span>}
        </div>
      </div>
    </div>
  ) : ''
}

export default InfoMeg