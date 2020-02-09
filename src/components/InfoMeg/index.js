import React from 'react';
import './style.less'
const InfoMeg = (props) => {

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
  console.log(props)
  return (
    <div className='infomey' onClick={() => { props.onValueId({ id: props.list._id, name: props.list.user_info[0].username }) }}>
      <div className='infomey_headerImg'>
        <img src={props.list.user_info[0].avatar} alt="" />
      </div>
      <div className='infomey_text'>
        <div className='infomey_top'>
          <p className='infomey_name'>{props.list.user_info[0].username}</p>
          <span className='infomey_time'>{time(props.list.arr.created)}</span>
        </div>
        <div className='infomey_bottom'>
          <span className='infomey_newtext'>{props.list.arr.text}</span>
          <span className='infomey_see'>{props.list.see}</span>
        </div>
      </div>
    </div>
  )
}

export default InfoMeg