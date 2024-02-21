import { getToken } from '@/utils/auth'
import axios from 'axios'
import Cookies from 'js-cookie'
import { MessageBox, Message, Notification } from 'element-ui'
function IsNull(value) {
  var str = value
  str = String(str)
  if (str == 'undefined' || str == 'null' || !str || !/[^\s]/.test(str)) {
    return true;
  } else {
    return false;
  }
}

const service = axios.create({
	baseURL: process.env.NODE_ENV=='development'?(process.env.VUE_APP_IP+':'+process.env.VUE_APP_Host) :process.env.VUE_APP_IP
})
service.interceptors.request.use(
  config => {
    console.log(process.env.VUE_APP_IP+':'+process.env.VUE_APP_Host+'/')
    if (!!getToken()) {
      config.headers.common["Authorization"] = "Bearer " + getToken();
    }
    // config.headers.common[".AspNetCore.Culture"] = "zh-hans";
    // config.headers.common["Abp.TenantId"] = Cookies.get("tenantId");
    return config
  },
  error => {
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
  response => {
    return response.data
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