//听书宝
const axios = require("axios");

const Http = axios.create({
    baseURL: 'http://m.tingshubao.com',
    timeout: 100 * 1000,
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

