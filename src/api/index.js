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
  users(data) {
    return axios({
      url: 'users',
      method: 'get',
      params: data
    })
  },
  update(id, data) {
    return axios({
      url: `/users/${id}`,
      method: 'patch',
      data
    })
  },
  following(id) {
    return axios({
      url: `/users/following/${id}`,
      method: 'put'
    })
  },
  unFollowing(id) {
    return axios({
      url: `/users/following/${id}`,
      method: 'delete'
    })
  },
  followersList(id) {
    return axios({
      url: `/users/${id}/followers`,
      method: 'get'
    })
  },
  followingList(id) {
    return axios({
      url: `/users/${id}/following`,
      method: 'get'
    })
  },
  crossList(id) {
    return axios({
      url: `/users/${id}/crossList`,
      method: 'get'
    })
  },
  followingId(data) {
    return axios({
      url: '/users/following',
      method: 'get',
      params: data
    })
  },
  cross(data) {
    return axios({
      url: '/users/cross',
      method: 'get',
      params: data
    })
  },
  search(data) {
    return axios({
      url: '/users/search',
      method: 'get',
      params: data
    })
  },

  messageFindId(id) {
    return axios({
      url: `/message/${id}`,
      method: 'get'
    })
  },
  chat(data) {
    return axios({
      url: '/message/all',
      method: 'get',
      params: data
    })
  },
  allSee(id) {
    return axios({
      url: `/message/allSee/${id}`,
      method: 'get'
    })
  },
  clearSee(data) {
    return axios({
      url: '/message/see',
      method: 'put',
      data
    })
  },
  countSee(data) {
    return axios({
      url: '/message/see',
      method: 'get',
      params: data
    })
  },

  dyRemove(id) {
    return axios({
      url: `/dynamic/${id}`,
      method: 'delete'
    })
  },
  dySend(data) {
    return axios({
      url: '/dynamic/send',
      method: 'post',
      data
    })
  },
  dyId(id) {
    return axios({
      url: `/dynamic/${id}`,
      method: 'get'
    })
  },
  dyUserId(data) {
    return axios({
      url: '/dynamic/userId',
      method: 'get',
      params: data
    })
  },
  dyList(data) {
    return axios({
      url: '/dynamic/',
      method: 'get',
      params: data
    })
  },
  dyFollow(data) {
    return axios({
      url: '/dynamic/follow',
      method: 'get',
      params: data
    })
  },

  give(data) {
    return axios({
      url: '/dynamic/give',
      method: 'post',
      data
    })
  },
  findGive(data) {
    return axios({
      url: '/dynamic/give',
      method: 'get',
      params: data
    })
  },
  comment(data) {
    return axios({
      url: '/dynamic/comment',
      method: 'post',
      data
    })
  },
  unComment(data) {
    return axios({
      url: '/dynamic/comment',
      method: 'delete',
      data
    })
  },
  allComment(data) {
    return axios({
      url: '/dynamic/allComment',
      method: 'get',
      params: data
    })
  },
  countComment(data) {
    return axios({
      url: '/dynamic/countComment',
      method: 'get',
      params: data
    })
  },


  sendEmail(data) {
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
  },
  generateRtcToken(data) {
    return axios({
      url: '/generateRtcToken',
      method: 'get',
      params: data
    })
  }
}

export default API;