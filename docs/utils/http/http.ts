//导入request
import request from './request'

async function get(url:string, params: any) {
    return request({
        url: url,
        method: 'get',
        params: params
    })
}

async function post(url:string, params: any) {
    return request({
        url: url,
        method: 'post',
        data: params
    })
}

//导出
export default {
    get: get,
    post: post
}