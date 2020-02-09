import React from 'react';

export const AppContext = React.createContext();

export const initial = {
  user: {},
  tabBarList: [
    { 'icon': 'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg', 'selectedIcon': 'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg', 'title': '消息', 'key': 'message', 'route': '/' },
    { 'icon': 'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg', 'selectedIcon': 'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg', 'title': '联系人', 'key': 'friends', 'route': '/friends' },
    { 'icon': 'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg', 'selectedIcon': 'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg', 'title': '我的', 'key': 'my', 'route': '/my' }],
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