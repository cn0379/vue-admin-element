import request from '@/api/request.js'

function getStudentList(kv) {
  return request({
    url: '/admin/xy/student/list',
    method: 'get',
    kv
  })
}

function studentDetail(kv) {
  return request({
    url: '/admin/xy/student/detail',
    method: 'get',
    kv
  })
}

function studentSave(kv) {
  return request({
    url: '/admin/xy/student/save',
    method: 'post',
    kv
  })
}

function studentUpdate(kv) {
  return request({
    url: '/admin/xy/student/update',
    method: 'post',
    kv
  })
}

function studentDorm(kv) {
  return request({
    url: '/admin/xy/dorm/list',
    method: 'get',
    kv
  })
}

function costList(kv) {
  return request({
    url: '/admin/xy/cost/list',
    method: 'get',
    kv
  })
}

export default {
  getStudentList,
  studentDetail,
  studentSave,
  studentUpdate,
  studentDorm,
  costList
}
