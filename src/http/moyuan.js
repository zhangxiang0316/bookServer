/**
 * create by zhangxiang on 2021-12-17 22:18
 * 类注释：墨缘文学
 * 备注：
 */
const axios = require("axios");

const Http = axios.create({
  baseURL: 'https://www.mywenxue.cc',
  timeout: 60 * 1000,
  withCredentials: true
})

Http.interceptors.request.use(config => {
  return config
})

Http.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

module.exports = Http

