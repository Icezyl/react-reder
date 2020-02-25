import React from 'react';

export const AppContext = React.createContext();

export const initial = {
  user: {},
  tabBarList: [
    { 'icon': 'icon-shouye', 'selectedIcon': 'icon-shouye1', 'title': '首页', 'key': 'message', 'route': '/' },
    { 'icon': 'icon-xiaoxi-copy', 'selectedIcon': 'icon-xiaoxi-copy', 'title': '消息', 'key': 'message', 'route': '/message' },
    { 'icon': 'icon-lianxiren', 'selectedIcon': 'icon-lianxiren1', 'title': '联系人', 'key': 'friends', 'route': '/friends' },
    { 'icon': 'icon-wode', 'selectedIcon': 'icon-wode', 'title': '我的', 'key': 'my', 'route': '/my' }],
  count: 0,
  id: sessionStorage.getItem('id') ? sessionStorage.getItem('id') : '',
  token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
  messageList: ''
};

const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'setToken':
      sessionStorage.setItem('token', payload.token);
      sessionStorage.setItem('id', payload.id);
      return { ...state, token: payload.token, id: payload.id }
    case 'setMessageList':
      return { ...state, messageList: payload.messageList }
    default: return { ...state };
  }
}

export default reducer;