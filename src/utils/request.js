import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/store'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
});
// 请求拦截
service.interceptors.request.use(
    // 在这个位置需要统一的去注入token
    config => {
        // 如果token存在 注入token
        if (store.getters.token) {
            config.headers.Authorization = `Bearer ${store.getters.token}`
        }
        // 必须返回配置
        return config
    },
    error => {
        return Promise.reject(error)
    }
);
// 响应拦截
service.interceptors.response.use(
    response => {
        const { data, message, success } = response.data
        if (success) {
            return data
        } else {
            Message.error(message)
            return Promise.reject(new Error(message));
        }
    },
    error => {
        Message.error(error.message);
        return Promise.reject(error)
    }
);

export default service