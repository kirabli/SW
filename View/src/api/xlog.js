import {AxiosPost,AxiosGet} from '@/utils/axiosUtil.js'
export async function GetAllListXlog(data) {
	var entity = await AxiosGet('Xlog/GetAllPage', data)
	return entity
}
export async function CreateXlog(data) {
	var entity = await AxiosPost('Xlog/Create', data)
	return entity
}