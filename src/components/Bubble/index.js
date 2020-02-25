import React from 'react';
import './style.less'
const Bubble = (props) => {
  console.log(props)
  return props.list ? (
    <div className={props.id!==props.list.sendId ? 'bubble' : 'bubble reverse'}>
      <div className='bubble_img'>
        <img src='https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3256100974,305075936&fm=26&gp=0.jpg' alt='' />
      </div>
      <div className={props.id!==props.list.sendId ? 'bubble_text left' : 'bubble_text right'} >{props.list.text}</div>
    </div>
  ) : ''
}

export default Bubble