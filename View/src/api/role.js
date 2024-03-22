import {AxiosPost,AxiosGet,AxiosCommon} from '@/utils/axiosUtil.js'

export async function GetRoles(data) {
  var entity = await AxiosGet('Role/GetRoles', data)
	return entity
}

export async function addRole(data) {
  var entity = await AxiosGet('Role/GetRoles', data)
	return entity
}
export async function updateRole(data) {
  var entity = await AxiosGet('Role/GetRoles', data)
	return entity
}
export async function deleteRole(data) {
  var entity = await AxiosGet('Role/GetRoles', data)
	return entity
}