import { AxiosPost, AxiosGet, AxiosCommon } from '@/utils/axiosUtil.js'

export async function GetAllRoute(data) {
	var entity = await AxiosGet('SysRoute/GetAllRoute', data)
	return entity
}
