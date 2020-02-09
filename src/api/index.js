import axios from './axios';

const API = {
  async login(name, paw) {
    return await axios.post('user/login', {
      'username': name,
      'password': paw
    })
  },
  res(name, paw) {
    return axios.post('user/register', {
      'username': name,
      'password': paw
    })
  },
  friends(id) {
    return axios.post('friend/find', {
      'id': id
    })
  },
  news(id) {
    return axios.post('friend/news', {
      'id': id
    })
  },
  userFind(id) {
    return axios.get('user/find', {
      'id': id
    })
  },
  search(name) {
    return axios.get('friend/search', {
      'name': name
    })
  },
  personal(id, youId) {
    return axios.post('friend/personal', {
      'id': id, 'youId': youId
    })
  },
  add(id, youId) {
    return axios.post('/friend/add', {
      'myId': id, 'youId': youId
    })
  },
  agree(id) {
    return axios.post('/friend/agree', {
      id
    })
  },
  messageFindId(id) {
    return axios.post('/message/findId', {
      id
    })
  }
}

export default API;