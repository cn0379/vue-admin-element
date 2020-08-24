import request from '@/api/request'

function doLogin(kv) {
  return request({
    url: '/admin/login/doLogin',
    method: 'post',
    kv
  })
}

function doLogOut(kv) {
  return request({
    url: '/admin/login/doLogOut',
    method: 'get',
    kv
  })
}

export default {
  doLogOut,
  doLogin
}
