import React, { useContext, useState, useEffect } from 'react'
import { Button } from 'antd-mobile'
import { AppContext } from '../../../reducer'
import api from '../../../api'
import './style.less'
const FollowList = props => {
  const [state] = useContext(AppContext)
  const [list, setList] = useState([])
  const [but, setBut] = useState(false)
  useEffect(() => {
    console.log(props)
    if (props.location.pathname === '/friend') {
      api.crossList(state.id).then(res => {
        setList(res)
      })
    } else if (props.location.pathname === '/friend/follow') {
      api.followingList(state.id).then(res => {
        setList(res)
      })
    } else if (props.location.pathname === '/friend/fans') {
      setBut(true)
      api.followersList(state.id).then(res => {
        setList(res)
      })
    }
  }, [])
  const Info = props => {
    const [foll, setFoll] = useState(false)
    if (but) {
      props.follow.then(res => {
        setFoll(res)
      })
    }
    return (
      <div className='info' onClick={props.onClick}>
        <div className='info_left'>
          <div className='left_img'>
            <img alt='' src={props.user.avatar}></img>
            {props.user.state ? <span></span> : ''}
          </div>
          <p className='left_name'>{props.user.username}</p>
        </div>
        {
          but !== foll ?
            <div className='info_right'>
              <Button className='right_but' inline size='small' type='primary'>关注</Button>
            </div>
            : ''
        }
      </div>
    )
  }
  return (
    <div>
      {list.map((item, index) => {
        return <Info key={index} user={item} follow={but ?
          api.cross({ to: state.id, from: item._id }).then(res => {
            return res.count
          })
          : ''}
          onClick={() => props.history.push(`/myHome/${item._id}`)}
        ></Info>
      })}
    </div >
  )
}
export default FollowList