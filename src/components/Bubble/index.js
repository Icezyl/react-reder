import React from 'react';
import { Link } from 'react-router-dom'
import './style.less'
const Bubble = (props) => {
  return props.list ? (
    <div className={props.id === props.list.to ? 'bubble' : 'bubble reverse'}>
      <Link to={`/myHome/${props.user._id}`}>
        <div className='bubble_img'>
          <img src={props.user.avatar} alt='' />
        </div>
      </Link>
      <div className={props.id === props.list.to ? 'bubble_content' : 'bubble_content'} >
        {
          props.list.typeId === 1 ?
            <p className={props.id === props.list.to ? 'left' : 'right'}>{props.list.content}</p>
            : props.list.typeId === 2 ?
              <img src={props.list.img} alt=''></img> : ''
        }
      </div>
    </div>
  ) : ''
}

export default Bubble