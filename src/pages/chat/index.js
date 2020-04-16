import React, { useState, useContext, useEffect, useRef } from 'react'
import { NavBar, Icon, Button, Grid, Toast, PullToRefresh } from 'antd-mobile'
import io from '../../io'
import Bubble from '../../components/Bubble'
import { AppContext } from '../../reducer'
import api from '../../api'
import CallAudio from '../../components/CallAudio'
import CallVideo from '../../components/CallVideo'
import './style.less'
const Chat = (props, ref) => {
  const box = useRef()
  const [state, dispatch] = useContext(AppContext)
  const [value, setValue] = useState('')
  const [list, setList] = useState([])
  const [user, setUser] = useState()
  const [fold, setFold] = useState(false)
  const [hbox, setHbox] = useState(90)
  const [channel, setChannel] = useState()
  const [call, setCall] = useState({ audio: false, video: false })
  const [img, setImg] = useState()
  const [refreshing, setRefreshing] = useState(false)
  const sendRef = useRef()
  const file = useRef()
  const [page, setPage] = useState(1)
  const onSend = () => {
    if (value.length || img) {
      if (img) {
        io.emit('send', { from: state.id, content: '[图片]', to: props.match.params.id, img: img, typeId: 2 })
        setList([...list, { from: state.id, content: '[图片]', to: props.match.params.id, img: img, typeId: 2 }])
      } else {
        io.emit('send', { from: state.id, content: value, to: props.match.params.id, typeId: 1 })
        setList([...list, { from: state.id, content: value, to: props.match.params.id, typeId: 1 }])
      }
      setValue('')
      setTimeout(() => {
        box.current.scrollTop = box.current.scrollHeight
      }, 100)
    }
  }
  const data = [
    {
      icon: 'icon-tupian',
      text: '图片',
      key: 0
    },
    {
      icon: 'icon-dianhua1',
      text: '语音通话',
      key: 1
    },
    {
      icon: 'icon-shipin',
      text: '视频通话',
      key: 2
    }
  ]

  useEffect(() => {
    api.chat({ id: state.id, to: props.match.params.id, page: page }).then(res => {
      setList(res.list)
    })
    Clear()
    api.users({ _id: props.match.params.id }).then(res => {
      setUser(res.user)
    })
    let tt = setTimeout(() => {
      box.current.scrollTop = box.current.scrollHeight
    }, 100)
    return () => {
      clearTimeout(tt)
    }
  }, [])
  io.on('chat', data => {
    if (box.current) {
      setList([...list, data])
      Clear()
      setTimeout(() => {
        box.current.scrollTop = box.current.scrollHeight
      }, 100)
    }
  })
  const Clear = () => {
    api.clearSee({ from: props.match.params.id, to: state.id })
    let messageId = [props.match.params.id, state.id].sort().join('_')
    io.emit('clearSee', { messageId, to: state.id })
  }
  const onChange = (e) => {
    if (e.target.files.length) {
      var formData = new FormData()
      formData.append('file', e.target.files[0])
      api.yunToken().then(res => {
        formData.append('token', res.token)
        api.yunLoad(formData).then(res => {
          let img = 'http://cdn.goodluck.video/' + res.hash
          setImg(img)
          onSend()
          setUser({ ...user, avatar: img })
        })
      })
    }
  }
  const GridOnClick = (e) => {
    if (e.key === 0) {
      file.current.click()
    } else {
      api.cross({ to: props.match.params.id, from: state.id }).then(res => {
        if (res.count) {
          if (e.key === 1) {
            let chan = [state.id, props.match.params.id].sort().join('_')
            setChannel(chan)
            setCall({ ...call, audio: true })
          } else if (e.key === 2) {
            let chan = [state.id, props.match.params.id].sort().join('_')
            setChannel(chan)
            setCall({ ...call, video: true })
          }
        } else {
          Toast.info('成为我好友才可以通话哦', 2, null, false)
        }
      })
    }

  }
  const onRefuse = (e) => {
    setCall({ ...call, ...e })
  }
  return user ? (
    <div className='chat'>
      <NavBar
        icon={<Icon type="left" />}
        mode='light'
        onLeftClick={() => props.history.go(-1)}
      >{user.username}</NavBar>
      <div ref={box} style={{ overflowY: 'auto', height: `calc(100vh - ${hbox}px)` }}>
        <PullToRefresh
          damping={60}
          indicator={{ activate: '查看更多' }}
          direction={'down'}
          refreshing={refreshing}
          onRefresh={() => {
            let height = box.current.scrollHeight - 10
            setRefreshing(true)
            setPage(() => page + 1)
            api.chat({ id: state.id, to: props.match.params.id, page: page + 1 }).then(res => {
              setList([...res.list, ...list])
              setRefreshing(false)
              box.current.scrollTop = height
            })
          }}
        >
          <div className='x'>
            {list.map((item, index) => {
              return <Bubble key={index} list={item} id={state.id} user={item.to === state.id ? user : state.user}></Bubble>
            })}
          </div>
        </PullToRefresh>
      </div>
      <div className='chat_send' ref={sendRef}>
        <div className='out'>
          <input className='send_text'
            value={value}
            type='text'
            onKeyDown={(e) => {
              if (e.keyCode === 13) { onSend() }
            }}
            onChange={(e) => {
              setValue(e.target.value)
            }}
            onFocus={async () => {
              await setFold(false)
              setHbox(sendRef.current.scrollHeight + 50)
            }}></input>
          {value ? <Button type='primary' size='small' onClick={onSend} inline>发送</Button> : <span className='send_add iconfont icon-zengjia' onClick={async () => {
            await setFold(!fold)
            setHbox(sendRef.current.scrollHeight + 50)
            box.current.scrollTop = box.current.scrollHeight
          }}></span>}
        </div>
        <div hidden={!fold}>
          <Grid
            data={data}
            itemStyle={{ background: '#f6f6f6' }}
            hasLine={false}
            renderItem={dataItem => (
              <div style={{ padding: '20px', }}>
                <span className={'iconfont ' + dataItem.icon} style={{ fontSize: '22px', color: '#888888', background: 'white', display: 'inline-block', borderRadius: 10, height: 40, width: 40, lineHeight: '40px' }}></span>
                <div style={{ fontSize: 10, lineHeight: '25px' }}>{dataItem.text}</div>
              </div>
            )}
            onClick={GridOnClick}
          ></Grid>
        </div>
      </div>
      {call.audio ? <CallAudio onRefuse={onRefuse} channel={channel} user={user} id={state.id} operation={true} call={true} ></CallAudio> : ''}
      {call.video ? <CallVideo onRefuse={onRefuse} channel={channel} user={user} id={state.id} operation={true} call={true}></CallVideo> : ''}
      <input name="file" ref={file} hidden type="file" accept='.jpg,.png' onChange={(e) => {
        onChange(e)
      }} />
    </div >
  ) : ''
}
export default Chat