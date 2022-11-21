// 导入axios
import axios from 'axios'
//导入QS
import qs from 'qs'
import ToTimeConfig from '../../config/ToTime.config'

// 请求对象
const pendingMap = new Map<string, any>;

const getRequestKey = (config = {}) => {
    // @ts-ignore
    const {url, method, params, data} = config
    return [url, method, qs.stringify(params), qs.stringify(data)].join('&')
}

const addPendingRequest = (config) => {
    const key = getRequestKey(config)
    if (!pendingMap.has(key)) {
        config.cancelToken = new axios.CancelToken(cancel => {
            pendingMap.set(key, cancel)
        })
    }
}

const removePendingRequest = (config) => {
    const key = getRequestKey(config)
    if (pendingMap.has(key)) {
        const cancelToken = pendingMap.get(key)
        cancelToken(key)
        pendingMap.delete(key)
    }
}

/**
 * 请求节流
 * @param fn 请求函数
 * @param delay 延迟时间
 */
const throttle = (fn, delay) => {
    let timer = null;
    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                // @ts-ignore
                fn.apply(this, arguments);
                timer = null;
            }, delay);
        }
    }
}

//创建axios实例
const service = axios.create({
    baseURL: ToTimeConfig.baseURL,
    // 请求超时时间,延时请求原因注释掉
    // timeout: 3000
})

// request拦截器
service.interceptors.request.use(
    async config => {
        //判断是否存在请求的key
        if (pendingMap.has(getRequestKey(config))) {
            //存在则取消请求
            config.cancelToken = new axios.CancelToken(cancel => {
                cancel('重复请求')
            })
        }
        //不存在则添加到pendingMap中
        addPendingRequest(config)

        throttle(service, 10000)
        return config
    }, error => {
        // @ts-ignore
        return Promise.reject(error)
    })

//响应拦截器
service.interceptors.response.use(
    response => {
        //移除pendingMap中的请求
        removePendingRequest(response.config)
        return response
    },
    error => {
        // 移除重复请求
        removePendingRequest(error.config)
        // @ts-ignore
        return Promise.reject(error)
    }
)

export default service