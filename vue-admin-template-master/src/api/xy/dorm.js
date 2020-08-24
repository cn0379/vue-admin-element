import request from '@/api/request.js'

function saveDorm(kv) {
  return request({
    url: '/admin/xy/dorm/save',
    method: 'post',
    kv
  })
}

function detailDorm(kv) {
  return request({
    url: '/admin/xy/dorm/detail',
    method: 'post',
    kv
  })
}

function updateDorm(kv) {
  return request({
    url: '/admin/xy/dorm/update',
    method: 'post',
    kv
  })
}

export default {
  saveDorm,
  detailDorm,
  updateDorm
}
