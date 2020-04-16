import React from 'react';

export const AppContext = React.createContext();

export const initial = {
  user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {},
  id: sessionStorage.getItem('id') ? sessionStorage.getItem('id') : '',
  token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
  tabBarList: [
    { 'icon': 'icon-shouye', 'selectedIcon': 'icon-shouye1', 'title': '首页', 'key': 'index', 'route': '/' },
    { 'icon': 'icon-shequ', 'selectedIcon': 'icon-shequ1', 'title': '动态', 'key': 'dynamic', 'route': '/dynamic' },
    { 'icon': 'icon-pinglun', 'selectedIcon': 'icon-pinglun1', 'title': '聊天', 'key': 'message', 'route': '/message', badge: 0 },
    { 'icon': 'icon-wode', 'selectedIcon': 'icon-wode1', 'title': '我的', 'key': 'my', 'route': '/my' }],
  count: 0,
  messageList: '',
  chatMeg: []
};

const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'setToken':
      sessionStorage.setItem('token', payload.token);
      sessionStorage.setItem('id', payload.id);
      sessionStorage.setItem('user', JSON.stringify(payload.user));
      return { ...state, token: payload.token, id: payload.id, user: payload.user }
    case 'setMessageList':
      return { ...state, messageList: payload.messageList }
    case 'setAddBadge':
      let tabBarList = state.tabBarList
      tabBarList[2].badge = payload.badge
      return { ...state, tabBarList }
    case 'clearOut':
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('id')
      sessionStorage.removeItem('token')
      return { ...state, user: {}, id: '', token: '' }
    default: return { ...state };
  }
}

export default reducer;