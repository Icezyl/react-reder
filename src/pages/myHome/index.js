import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../reducer'
import { NavBar, Icon, Button } from 'antd-mobile'
import Index from '../dynamic/dy'
import api from '../../api'
import './style.less'
const MyHome = props => {
  const [state, dispatch] = useContext(AppContext)
  const [you, setYou] = useState(false)
  const [user, setUser] = useState()
  const [follow, setFollow] = useState()
  useEffect(() => {
    if (props.match.params.id === state.id) {
      setYou(true)
    }
    api.users({ _id: props.match.params.id }).then(res => {
      setUser(res.user)
    })
    if (state.id !== props.match.params.id) {
      api.followingId({ id: state.id, follow: props.match.params.id }).then(res => {
        setFollow(res.count)
      })
    }

  }, [props.match.params.id, state.id])
  function following() {
    api.following(props.match.params.id).then(res => {
      setFollow(1)
    })
  }
  function unFollowing() {
    api.unFollowing(props.match.params.id).then(res => {
      setFollow(0)
    })
  }
  return user ? (
    <div className='myHome'>
      <NavBar className='myHome_nav' mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => {
          props.history.go(-1)
        }}
      />
      <img className='myHome_back' src='https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3582135972,3389654032&fm=26&gp=0.jpg' alt=''></img>
      <div className='myHome_my'>
        <div className='my_header'>
          <div className='my_img'>
            <img src={user.avatar} alt=''></img>
          </div>
          <div style={{ marginRight: '10px' }}>
            <Button className='my_but' size='small' inline type='primary'>
              {you ?
                <span className='iconfont icon-chuangzuo' onClick={() => { props.history.push('/edit') }}> 编辑资料</span> :
                follow ?
                  <span className={'iconfont icon-aixin1'} onClick={unFollowing}> 取消</span>
                  :
                  <span className={'iconfont icon-aixin'} onClick={following}> 关注</span>}
            </Button>
            <Button inline className='my_but but_icon' size='small' onClick={() => props.history.push(`/chat/${props.match.params.id}`)}><span className='iconfont icon-cebianlan_liaotianliebiao' /></Button>
          </div>
        </div>
        <div className='my_box'>
          <p className='box_title'>{user.username}</p>
          <p className='box_brief'>{user.introduction ? user.introduction : '填写简介更容易获得关注哦~'}</p>
        </div>
      </div>
      <Index user={props.match.params.id}></Index>
    </div>
  ) : ''
}
export default MyHome