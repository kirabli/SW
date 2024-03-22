import {AxiosPost,AxiosGet,AxiosCommon} from '@/utils/axiosUtil.js'
export async function login(data) {
  var entity = await AxiosCommon('api/TokenAuth/Authenticate','post', {data:data})
	return entity
}

export async function getInfo(data) {
var entity = await AxiosGet('User/Get', data)
	return entity
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
