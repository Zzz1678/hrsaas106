import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

const timeKey = "hrsaas-timestamp-key"

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

// 获取登录时间
export function getTimeStamp() {
    return Cookies.get(timeKey);
}
//设置登录时间
export function setTimeStamp() {
    Cookies.set(timeKey, Date.now())
}