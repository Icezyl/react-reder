import React, { Suspense, useReducer, useState, useEffect } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { LoadingV2 } from './components'
import Routers from './routes'
import reducer, { AppContext, initial } from './reducer'
import CallAudio from './components/CallAudio'
import CallVideo from './components/CallVideo'
import api from './api'
import io from './io'
const App = (props) => {
  const [state, dispatch] = useReducer(reducer, initial)
  const [call, setCall] = useState({ audio: false, video: false })
  const [channel, setChannel] = useState()
  const [user, setUser] = useState()
  window.onbeforeunload = function (e) {
    io.emit('disconnection', { id: state.id })
  }
  useEffect(() => {
    if (state.token) {
      chat()
    }
  }, [])
  const chat = () => {
    api.messageFindId(state.id).then(res => {
      dispatch({
        type: 'setMessageList',
        payload: { messageList: res.list }
      })
    })
    api.allSee(state.id).then(res => {
      dispatch({
        type: 'setAddBadge',
        payload: { badge: res.count }
      })
    })
  }
  io.emit('/', { id: state.id })
  io.on('chat', data => {
    chat()
  })
  io.on('clearSee', data => {
    if (state.id) {
      api.allSee(state.id).then(res => {
        dispatch({
          type: 'setAddBadge',
          payload: { badge: res.count }
        })
      })
    }
  })
  io.on('callAudio', data => {
    console.log(data)
    fromUser(data.from)
    setChannel(data.channel)
    setCall({ ...call, audio: true })
  })
  io.on('callVideo', data => {
    fromUser(data.from)
    setChannel(data.channel)
    setCall({ ...call, video: true })
  })
  const fromUser = (id) => {
    api.users({ _id: id }).then(res => {
      setUser(res.user)
    })
  }
  const onRefuse = (e) => {
    setCall({ ...call, ...e })
  }
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <AppContext.Provider style={{ height: 'calc(100vh)' }} value={[state, dispatch]}>
        <HashRouter>
          <Suspense fallback={<LoadingV2 />}>
            <Switch>
              {Routers.map((item, index) => {
                return <Route key={index} path={item.path} exact={item.exact} render={props =>
                  (!item.auth ? (!state.token ? <item.component {...props} /> : <Redirect to={{
                    pathname: '/', state: { from: props.location }
                  }} />) : (state.token ? <item.component {...props} /> : <Redirect to={{
                    pathname: '/login', state: { from: props.location }
                  }} />)
                  )} />
              })}
              <Route component={LoadingV2} />
            </Switch>
          </Suspense>
        </HashRouter>
      </AppContext.Provider>
      {call.audio && user ? <CallAudio onRefuse={onRefuse} channel={channel} user={user}></CallAudio> : ''}
      {call.video && user ? <CallVideo onRefuse={onRefuse} channel={channel} user={user}></CallVideo> : ''}
    </div>
  )
}

export default App;