// 导入axios
import axios from 'axios'
//导入QS
import qs from 'qs'
import ToTimeConfig from '../../config/ToTime.config'

//创建axios实例
const service = axios.create({
    baseURL: ToTimeConfig.baseURL,
    // 请求超时时间,延时请求原因注释掉
    // timeout: 3000
})

// request拦截器
service.interceptors.request.use(config => {
    //如果是get请求，则使用qs.stringify()转换参数
    if (config.method === 'get') {
        config.params = config.params || {}
        config.params = qs.stringify(config.params)
    }
    return config
}, error => {
    // Do something with request error
    // @ts-ignore
    return Promise.reject(error)
    // Do something with request error
    // return Promise.reject(error)
})

//响应拦截器
service.interceptors.response.use(
    response => {
        // Do something with response data
        return response
    },
    error => {
        // Do something with response error
        // @ts-ignore
        return Promise.reject(error)
        // Do something with response error
        // return Promise.reject(error)
    }
)

export default service