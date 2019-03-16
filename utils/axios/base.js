import axios from 'axios'
import { Message } from 'element-ui';
let baseURL = ''
const service = axios.create({
  baseURL,
  timeout: 25000
})
service.interceptors.request.use(
  confirm => {
    return confirm
  },
  error => {
    console.log("Request ", error)
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const { data } = response
    if (data.code != 0) {
      Message.error({
        message: data.errMsg,
        showClose: true
      })
      return Promise.reject(data)
    } else {
      return data
    }
  },
  error => {
    const msg = error.toString()
    Message.error({
      message: "axions response error:" + msg,
      showClose: true
    })
    console.log("Response ", error)
    return Promise.reject(error)
  }
)

export function post(url, data) {
  return service({
    method: 'post',
    url,
    data
  })
}
export function get(url, params) {
  return service({
    method: 'get',
    url,
    params
  })
}
