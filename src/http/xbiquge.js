const axios = require("axios");

//modules/article/waps.php

const Http = axios.create({
    baseURL: 'https://www.xbiquge.la',
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

