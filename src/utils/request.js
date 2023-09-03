import axios from "axios";
import router from '@/router';

import { Message, Notification } from 'element-ui';

const request = axios.create(
    {
        // 设置前缀为/api
        baseURL: '/api'
    }
)

// 请求拦截器
request.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.token = token
    }
    return config
})

// 响应拦截器
request.interceptors.response.use(response => {
    // 20000代表成功
    if (response?.data?.code === 20000) {
        // 兼容处理
        if (typeof response?.data?.data === 'string')
            Message.success(response?.data?.data)
        if (typeof response?.data?.data?.info === 'string')
            Message.success(response?.data?.data?.info)
        return response
    }
    // 603 代表 token 失效，跳转回登录页面
    else if (response?.data?.code === 603) {
        Notification.error({
            title: '错误',
            message: '请重新登录'
        })
        // 替换到登录页面
        let url = window.location.href.split('/')
        if (url[url.length - 1] !== 'login') {
            router.replace('/login')
        }
    }
    // 原始请求状态不等于200表示相应错误
    else {
        if (response.status !== 200) {
            Notification.error({
                title: '错误',
                message: '响应错误'
            })
        }
    }
    return response
})

export default request