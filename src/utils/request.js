import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
// 自动收发cookie!
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // console.log(config.data)

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['auth-cookie'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    const status = response.status
    // console.log(res)
    // console.log(status)
    console.log(response)

    // if the custom code is not 20000, it is judged as an error.
    if (status !== 200 || res.errors) {
      console.log(res.code)
      Message({
        showClose: true,
        //信息取决于后端返回消息的字段
        message: res.msg_en || res.result || res.errors[0].message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      // Message({
      //   showClose: true,
      //   //信息取决于后端返回消息的字段
      //   message: res.msg_cn || res.msg_en || '操作成功',// || res.result 
      //   type: 'success',
      //   duration: 5 * 1000
      // })
      return res
    }
  },
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      // console.log(error.response.body)
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }

    console.log('err' + error) // for debug
    // console.log(error)
    // if (error.response.data.msg_en.match(/.duplicate key value violates unique constraint./)) {
    //   Message({
    //     showClose: true,
    //     message: "用户名被占用", //response.data.msg_en,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    // } else {
    if (error.response.status == 400) {
      Message({
        showClose: true,
        message: `不支持此操作，可能是权限不足或字段不允许重复`, //response.data.msg_en,
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      Message({
        showClose: true,
        message: error.message, //response.data.msg_en,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
