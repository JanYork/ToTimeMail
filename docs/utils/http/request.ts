// 导入axios
import axios from 'axios'
//导入QS
import qs from 'qs'

//创建axios实例
const service = axios.create({
    baseURL: "https://times.sady0.com/", // api的base_url
    // 请求超时时间,延时请求原因注释掉
    // timeout: 3000
})

// request拦截器
service.interceptors.request.use(config => {
    // Do something before request is sent
    // if (config.method === 'post') {
    //     config.data = qs.stringify(config.data)
    // }
    return config
}, error => {
    // Do something with request error
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
        return Promise.reject(error)
        // Do something with response error
        // return Promise.reject(error)
    }
)

export default service