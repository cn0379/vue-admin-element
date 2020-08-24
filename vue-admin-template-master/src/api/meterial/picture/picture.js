import request from '@/api/request'

function updateFile(kv) {
  return request({
    url: '/admin/xy/upload/uploadImg',
    method: 'post',
    kv
  })
}

function delPicture(kv) {
  return request({
    url: '/admin/xy/upload/del',
    method: 'get',
    kv
  })
}

function pictureList(kv) {
  return request({
    url: '/admin/xy/upload/list',
    method: 'post',
    kv
  })
}

function updateTitle(kv) {
  return request({
    url: '/admin/xy/upload/updateTitle',
    method: 'post',
    kv
  })
}

export default {
  updateFile,
  pictureList,
  delPicture,
  updateTitle
}

