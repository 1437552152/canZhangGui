import axios from '@/libs/api.request'

export const getQikanData = (q, p = 1) => {
  return axios.request({
    url: 'qikan/query/list/',
    params: {
      q,
      p
    },
    method: 'get'
  })
}

export const getQikanPdf = (articleid, title, info) => {
  return axios.request({
    url: 'qikan/query/list/',
    method: 'post',
    data: {
      articleid: articleid,
      title: title,
      info: info
    }
  })
}

export const getPatentList = (zlh, p = 1) => {
  return axios.request({
    url: 'patent/query/list/',
    params: {
      q,
      p
    },
    method: 'get'
  })
}

export const getPatentDetail = (articleid, title, info) => {
  return axios.request({
    url: 'qikan/query/list/',
    method: 'post',
    data: {
      articleid: articleid,
      title: title,
      info: info
    }
  })
}

export const getPatentPdfLink = (zlh) => {
  return axios.request({
    url: 'patent/query/pdf_link',
    params: {
      zlh
    },
    method: 'get'
  })
}
