import request from '@/api/request'

function dashboard(kv) {
  return request({
    url: '/admin/xy/dashboard/base',
    method: 'get',
    kv
  })
}

export default {
  dashboard
}
