import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/store'
import { getTimeStamp } from './auth';
import router from '@/router';

const timeOut = 3600

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
            if (checkTokenTimeOut()) {
                //已过期
                store.dispatch('user/logout') //退出
                router.push('/login')
                    // 提示token
                return Promise.reject(new Error("token超时了"))

            }
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
        // 后端返回token超时被动处理
        if (error.response && error.response.data & error.response.data.code === 1002) {
            store.dispatch('user/logout')
            router.push("/login")
        } else {
            Message.error(error.message)
        }
        return Promise.reject(error)
    }
);

function checkTokenTimeOut() {
    var currentTime = Date.now(); //当前时间
    var timeStamp = getTimeStamp() //token存入时间
    return (currentTime - timeStamp) / 1000 > timeOut
}

export default service