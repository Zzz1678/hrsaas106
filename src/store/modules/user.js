import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

export default {
    namespaced: true,
    state: {
        token: getToken() //设置token的共享状态// 设置token初始状态   token持久化 => 放到缓存中

    },
    // 修改状态
    mutations: {
        // 设置token
        setToken(state, token) {
            state.token = token // 设置token  只是修改state的数据  123 =》 1234
                // vuex变化 => 缓存数据
            setToken(token) // vuex和 缓存数据的同步
        },
        // 删除缓存
        removeToken(state) {
            state.token = null; // 删除vuex的token
            removeToken() // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
        }
    },
    actions: {
        async login(context, data) {
            // 经过响应拦截器的处理之后 这里的result实际上就是 token
            const result = await login(data); // 实际上就是一个promise  result就是执行的结果
            // axios默认给数据加了一层data
            // 表示登录接口调用成功 也就是意味着你的用户名和密码是正确的
            // 现在有用户token
            // actions 修改state 必须通过mutations
            context.commit("setToken", result)

        }
    }
}