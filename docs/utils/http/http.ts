/*
 * @Author: JanYork 747945307@qq.com
 * @Date: 2022-11-10 22:44:56
 * @LastEditors: JanYork 747945307@qq.com
 * @LastEditTime: 2022-11-10 22:53:48
 * @FilePath: \ToTime\docs\utils\http\http.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//导入request
import request from './request'

function get(url:string, params: any) {
    return request({
        url: url,
        method: 'get',
        params: params
    })
}

function post(url:string, params: any) {
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