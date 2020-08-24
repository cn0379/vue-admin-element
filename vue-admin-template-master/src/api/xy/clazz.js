import request from '@/api/request.js'

function getClassList(kv) {
  return request({
    url: '/admin/xy/clazz/list',
    method: 'post',
    kv
  })
}

function saveClassInfo(kv) {
  return request({
    url: '/admin/xy/clazz/save',
    method: 'post',
    kv
  })
}

function upDataClass(kv) {
  return request({
    url: '/admin/xy/clazz/update',
    method: 'post',
    kv
  })
}

function detailClass(kv) {
  return request({
    url: '/admin/xy/clazz/detail',
    method: 'post',
    kv
  })
}
export default {
  getClassList,
  saveClassInfo,
  upDataClass,
  detailClass
}
