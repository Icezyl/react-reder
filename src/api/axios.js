import axios from 'axios';
import { Toast } from 'antd-mobile'
const instance = axios.create({
  baseURL: 'http://localhost:5000/',
  timeout: 30000,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = 'Bearer ' + sessionStorage.token
  return config;
}, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use(response => {
  if (response.status === 200) {
    return response.data;
  }
  return response
}, (error) => {
  console.log(error.response)
  if (error.response) {
    Toast.info(error.response.data.msg, 2, null, false)
  }
  return Promise.reject(error);
});

export default instance

