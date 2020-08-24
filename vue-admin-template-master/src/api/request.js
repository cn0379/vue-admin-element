import axios from 'axios'
import qs from 'qs'
import { getToken, clearLoginInfo } from '@/utils/myAuth'
import { Message } from 'element-ui'

const service = axios.create({
  // baseURL: settingFile.host,
  timeout: 5000
})

// 请求列表
const requestList = []
const CancelToken = axios.CancelToken
const sources = {}
service.interceptors.request.use(
  config => {
    // 将请求地址及参数作为一个完整的请求
    const request = JSON.stringify(config.url) + JSON.stringify(config.kv)
    config.cancelToken = new CancelToken(cancel => {
      sources[request] = cancel
    })
    // 1.判断请求是否已存在请求列表，避免重复请求，将当前请求添加进请求列表数组；
    if (requestList.includes(request)) {
      sources[request] // 取消重复请求
    } else {
      requestList.push(request)
    }
    var token = getToken()
    if (token) {
      config.headers['bufan-token'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.tokenCode === '5000' || res.tokenCode === '5001') {
      Message({
        message: '发现未登录,请登录!',
        type: 'error',
        duration: 3 * 1000
      })
      clearLoginInfo()
      this.router.push('/login')
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

function $http(config) {
  console.log('post')
  if (config.method.toLowerCase() === 'get') {
    if (config.kv) {
      config.params = config.kv
    }
  } else {
    console.log('post')
    config.headers = { 'content-type': 'application/x-www-form-urlencoded' }
    if (config.kv) {
      if (Object.prototype.toString.call(config.kv) === '[object FormData]') {
        config.data = config.kv
      } else {
        config.data = config.kv
        config.data = qs.stringify(config.kv, { allowDots: true })
      }
    }
  }
  return service(config)
}

export default $http

