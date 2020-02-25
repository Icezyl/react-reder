import axios from './axios'

const API = {
  retrieve(data) {
    return axios({
      url: 'users/retrieve',
      method: 'put',
      data
    })
  },
  login(data) {
    return axios({
      url: 'users/login',
      method: 'post',
      data
    })
  },
  res(data) {
    return axios({
      url: 'users/register',
      method: 'post',
      data
    })
  },
  friends(data) {
    return axios({
      url: 'friend/',
      method: 'get',
      params: data
    })
  },
  news(data) {
    return axios({
      url: 'friend/news',
      method: 'get',
      params: data
    })
  },
  users(data) {
    return axios({
      url: 'users',
      method: 'get',
      params: data
    })
  },
  search(name) {
    return axios({
      url: `friend/search/${name}`,
      method: 'get'
    })
  },
  personal(data) {
    return axios({
      url: 'users',
      method: 'get',
      params: data
    })
  },
  add(data) {
    return axios({
      url: '/friend/add',
      method: 'post',
      data
    })
  },
  agree(data) {
    return axios({
      url: '/friend/agree',
      method: 'post',
      data
    })
  },
  messageFindId(id) {
    return axios({
      url: `/message/${id}`,
      method: 'get'
    })
  },
  chat(id) {
    return axios({
      url: `/message/all/${id}`,
      method: 'get'
    })
  },
  update(id, data) {
    return axios({
      url: `/users/${id}`,
      method: 'patch',
      data
    })
  },
  upload(data) {
    return axios({
      url: '/upload',
      method: 'post',
      data
    })
  },
  sendEmail(data){
    return axios({
      url: '/email',
      method: 'post',
      data
    })
  },
  yunToken() {
    return axios({
      url: '/yun',
      method: 'post'
    })
  },
  yunLoad(data) {
    return axios({
      url: 'http://up.qiniu.com',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'post',
      data
    })
  }
}

export default API;