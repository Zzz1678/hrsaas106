import axios from 'axios';
import { Message } from 'element-ui';

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
});
// 请求拦截
service.interceptors.request.use();
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