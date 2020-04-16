import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ActionSheet } from 'antd-mobile'
import api from '../../api'
import './style.less'
import moment from '../../util/moment'
const DynamicTab = props => {
  const [give, setGive] = useState()
  const [comment, setComment] = useState()
  useEffect(() => {
    if (props.list) {
      find()
      countComment()
    }
  }, [])
  const onGive = () => {
    api.give({ id: props.list._id }).then(res => {
      find()
    })
  }
  const showActionSheet = (e) => {
    const BUTTONS = ['私聊', '关注', '不喜欢', '取消']
    const My = ['删除', '取消']
    ActionSheet.showActionSheetWithOptions({
      options: e.id === props.id ? My : BUTTONS,
      cancelButtonIndex: e.id === props.id ? My.length - 1 : BUTTONS.length - 1,
      maskClosable: true,
      'data-seed': 'logId'
    },
      (buttonIndex) => {
        if (e.id === props.id) {
          if (buttonIndex === 0) {
            remove(e.dyId)
          }
        }
      });
  }
  const remove = (id) => {
    api.dyRemove(id).then(res => {
      props.onRefresh()
    })
  }
  const find = () => {
    api.findGive({ id: props.list._id, userId: props.id }).then(res => {
      setGive(res)
    })
  }
  const countComment = () => {
    api.countComment({ id: props.list._id }).then(res => {
      setComment(res)
    })
  }
  return props.list ? (
    <div className='dynamicTab'>
      <Link to={`/myHome/${props.list.userId._id}`}>
        <div className='tab_header'>
          <div className='header_left'>
            <div className='header_img'>
              <img src={props.list.userId.avatar} alt='' />
            </div>
            <div className='header_name'>
              <p className='name'>{props.list.userId.username} <span className={props.list.userId.sex ? 'iconfont icon-nan' : 'iconfont icon-nv'}></span></p>
              <p className='time'>{moment(props.list.created).fromNow(true)}前</p>
            </div>
          </div>
        </div>
      </Link>
      <div className='tab_body' >
        <Link to={`/DyDetails/${props.list._id}`}>
          <span className='body_txt'>{props.list.content}</span>
          {props.list.imgs.length > 0 ?
            <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
              {props.list.imgs.map((item, index) => {
                return <div style={{ width: '25%', height: 'calc(25vw)', margin: '5px 5px 0 0', overflow: 'hidden' }} key={index}>
                  <img alt='' style={{ width: '100%', borderRadius: '5px' }} src={item} ></img>
                </div>
              })}
            </div>
            : ''
          }
        </Link>
        <div className='body_foot'>
          <div className='foot_left'>
            <span className={give ? give.user ? 'iconfont icon-aixin1' : 'iconfont icon-aixin' : ''} onClick={onGive}></span>
            <span className='count'>{give ? give.count ? give.count : '点赞' : ''}</span>
            <span className='iconfont icon-taolunqu'></span>
            <span className='count'>{comment ? comment.count ? comment.count : '评论' : ''}</span>
          </div>
          <div className='foot_right'>
            <span className='iconfont icon-gengduo' onClick={() => showActionSheet({ id: props.list.userId._id, dyId: props.list._id })}></span>
          </div>
        </div>
      </div>
    </div>
  ) : ''
}
export default DynamicTab