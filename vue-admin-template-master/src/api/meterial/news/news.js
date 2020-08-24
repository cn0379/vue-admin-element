import request from '@/api/request'

function news(kv) {
  return request({
    url: '/admin/xy/news/list',
    method: 'get',
    kv
  })
}

function delNews(kv) {
  return request({
    url: '/admin/xy/news/del',
    method: 'get',
    kv
  })
}

function addNews(kv) {
  return request({
    url: '/admin/xy/news/save',
    method: 'post',
    kv
  })
}

function detailNews(kv) {
  return request({
    url: '/admin/xy/news/detail',
    method: 'get',
    kv
  })
}

function updataNews(kv) {
  return request({
    url: '/admin/xy/news/update',
    method: 'post',
    kv
  })
}

export default {
  news,
  delNews,
  addNews,
  detailNews,
  updataNews
}
