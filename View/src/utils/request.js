import axios from 'axios'
import { MessageBox, Message,Notification } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

function IsNull(value) {
  var str = value
  str = String(str)
  if (str == 'undefined' || str == 'null' || !str || !/[^\s]/.test(str)) {
    return true
  } else {
    return false;
  }
}

// create an axios instance
const service = axios.create({
  baseURL:process.env.NODE_ENV=='development'?(process.env.VUE_APP_IP+':'+process.env.VUE_APP_Host) :process.env.VUE_APP_IP
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      config.headers.common["Authorization"] = "Bearer " + getToken();
    }
    return config
  },
  error => {
    // do something with request error
    Message({
      // offset: 110,
      showClose: true,
      message: "Request:" + error,
      type: 'error',
      duration: 3000
    })
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

    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code == 50008 || res.code === 50012 || res.code == 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
      return res
    // }
  },
  error => {
    if (!!error.response && error.response.status === 401) {
      window.abp.auth.clearToken()
      location.reload();
    }
    if (!!error.response && !!error.response.data.error) {
      let msg = error.response.data.error.message === null ? "" : error.response.data.error.message;
      let details = error.response.data.error.details === null ? "" : error.response.data.error.details;
      let validation = error.response.data.error.validationErrors === null ? "" : error.response.data.error.validationErrors;

     Notification({
        title: '操作失败',
        type: 'error',
        dangerouslyUseHTMLString: true,
        duration: 4000,
        message: "<div style='width:100%; text-align:left; color:#c50000;'>" + msg + (IsNull(details) ? '' : '&nbsp;&nbsp;' + details) + (IsNull(validation) ? '' : '&nbsp;&nbsp;' + validation) + "</div>"
        // message: "<div style='width:100%; text-align:left; color:#b30000;'>" + msg + "</div>" + (IsNull(details) ? '' : details + "<br/>") + (IsNull(validation) ? '' : validation + "<br/>") //msg + details + validation
      });

    } else {
      if (error == "Error: Network Error") {
        Notification({
          title: '错误',
          type: 'error',
          message: "网络错误, 请稍后重试!",
        });
      }
      else if (error == "Error: timeout of 50000ms exceeded" || error == "Error: timeout of 300000ms exceeded") {
        Notification({
          title: '错误',
          type: 'error',
          dangerouslyUseHTMLString: true,
          duration: 4000,
          message: "<div style=' color:#c50000;''>网络超时<br/>请联系管理员</div>"
        });
      }
      else {
        Notification({
          title: '错误',
          type: 'error',
          message: "Response:" + error
        });
      }
    }
    return Promise.reject(error);
  }
)

export default service
