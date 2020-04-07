import React, { useEffect, useState, useContext, useRef } from 'react'
import { NavBar, Icon, Button, TextareaItem, ListView, PullToRefresh } from 'antd-mobile'
import api from '../../api'
import { AppContext } from '../../reducer'
import moment from '../../util/moment'
import './style.less'
const DyDetails = props => {
  const [state] = useContext(AppContext)
  const [value, setValue] = useState()
  const [give, setGive] = useState({ count: 0, user: 0 })
  const [dynamic, setDynamic] = useState()
  const [comment, setComment] = useState([])
  const [focus, setFocus] = useState(true)
  const itemfocus = useRef(null)
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [dataSource, setDataSource] = useState(new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  }))
  useEffect(() => {
    document.addEventListener('click', (e) => {
      var tDom = e.target
      var cDom = document.querySelector(".shulu_of");
      if (cDom === tDom || cDom ? cDom.contains(tDom) : '') {
      } else {
        setFocus(true)
      }
    })
  }, [])
  useEffect(() => {
    api.dyId(props.match.params.id).then(res => {
      setDynamic(res.dynamic)
    })
    onRefresh()
    find()
  }, [props.match.params.id])
  function onSend() {
    if (value.trim().length) {
      api.comment({ id: dynamic._id, content: value, userId: state.id }).then(res => {
        onRefresh()
        setValue('')
      })
    } else {

    }
  }
  function onGive() {
    api.give({ id: props.match.params.id }).then(res => {
      find()
    })
  }
  function onRefresh() {
    setRefreshing(true)
    setIsLoading(true)
    api.allComment({ id: props.match.params.id }).then(res => {
      setIsLoading(false)
      setRefreshing(false)
      setComment(res.list)
      setDataSource(dataSource.cloneWithRows(res.list))
    })
  }
  function onEndReached(event) {
    setPage(page => page + 1)
    setIsLoading(true)
    api.allComment({ id: props.match.params.id, page: page + 1 }).then(res => {
      setIsLoading(false)
      setComment([...comment, ...res.list])
      setDataSource(dataSource.cloneWithRows([...comment, ...res.list]))
    })
  }
  function find() {
    api.findGive({ id: props.match.params.id, userId: state.id }).then(res => {
      console.log(res)
      setGive(res)
    })
  }
  const row = (rowData) => {
    return (
      <div className='comment'>
        <div className='comment_img'>
          <img src={rowData.userId.avatar} alt='' />
        </div>
        <div className='comment_body'>
          <p className='body_name'>{rowData.userId.username}</p>
          <p className='body_time'>{moment(rowData.created).fromNow(true) + '前'}</p>
          <p className='body_comm'>{rowData.content}</p>
        </div>
      </div>
    )
  }

  return dynamic ? (
    <div className='details'>
      <NavBar mode='light'
        icon={<Icon type="left" />}
        onLeftClick={() => {
          props.history.go(-1)
        }}
      >详情</NavBar>
      <div className='details_header'>
        <div className='header_left'>
          <div className='header_img'><img src={dynamic.userId.avatar} alt=''></img></div>
          <div className='header_title'>
            <p className='title_name'>{dynamic.userId.username}</p>
            <p className='title_dy'>{moment(dynamic.created).fromNow(true)}前</p>
          </div>
        </div>
        <div className='header_right'>
          {
            dynamic.userId._id === state.id ? '' :
              <Button inline size='small' className='button'>关注</Button>
          }
        </div>
      </div>
      <div className='details_body'>
        <p className='body_txt'>{dynamic.content}</p>
        {dynamic.imgs.length > 0 ? dynamic.imgs.map((item, index) => {
          return <img src={item} className='body_img' alt='' key={index} />
        }) : ''}
      </div>
      <div id='details_foot'>
        <p>所有评论 {comment.length}</p>
      </div>

      <ListView
        style={{
          overflow: 'auto',
          marginBottom: '36px'
        }}
        dataSource={dataSource}
        renderRow={row}
        useBodyScroll={true}
        pullToRefresh={<PullToRefresh
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
        onEndReachedThreshold={20}
        onEndReached={(event) => onEndReached(event)}
        pageSize={5}
      />

      <div className='details_shulu'>
        {
          focus ?
            <div className='shulu_blur'>
              <div className='blur_input' onClick={() => {
                setFocus(false)
                // itemfocus.current.focus()
                console.log(itemfocus)
              }}>说点什么吧...</div>
              <span className={give.user ? 'iconfont icon-aixin1' : 'iconfont icon-aixin'} onClick={onGive}></span>
              <span className='icon_num'>{give.count ? give.count : '点赞'}</span>
              <span className='iconfont icon-pinglun' onClick={() => {
                document.getElementById('details_foot').scrollIntoView(true)
              }}></span>
              <span className='icon_num'>{comment.length ? comment.length : '评论'}</span>
            </div>
            :
            <div className='shulu_of'>
              <TextareaItem
                ref={itemfocus}
                placeholder='说点什么吧'
                autoHeight
                value={value}
                onChange={(e) => setValue(e)}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) { onSend() }
                }}>
              </TextareaItem>
              {value ?
                <Button inline size='small' type='primary' className='shulu_buttom' onClick={onSend}>发送</Button> : ''}
            </div>
        }


      </div>
    </div>
  ) : ''
}
export default DyDetails