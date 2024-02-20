import request from '@/utils/request'
import downloadjs from 'downloadjs'
export async function AxiosPost(url, data, timeout = 30000) {
		url = '/api/services/app/' + url
    var re = await request({
        url: url,
        method: 'POST',
        data: data,
        timeout: timeout
    })

    return re.result;
}

export async function AxiosGet(url, data, timeout = 30000) {
		url = '/api/services/app/' + url
    var re = await request({
        url: url,
        method: 'GET',
        params: data,
        timeout: timeout
    })
    return re.result;
}
export async function AxiosDownload(url, methods, data, filename) {
		url = '/api/services/app/' + url
    var re = await request({
        url: url,
        method: methods,
        params: data,
        responseType: 'blob'
    })

    //拿不到header
    //filename = filename || extractFileNameFromContentDispositionHeader(res.headers["content-disposition"]);
    filename = filename || '默认名称.xlsx';
    downloadjs(re, filename);
    return re.result;
}