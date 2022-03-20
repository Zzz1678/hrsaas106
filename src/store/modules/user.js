import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router'

export default {
    namespaced: true,
    state: {
        token: getToken(), //设置token的共享状态// 设置token初始状态   token持久化 => 放到缓存中
        userInfo: {}
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
        },
        // 存储用户数据
        setUserInfo(state, data) {
            state.userInfo = data;
        },
        // 删除用户数据
        removeUserInfo(state) {
            state.userInfo = {}
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

            // 存入时间戳
            setTimeStamp()
        },
        // 调用接口获取用户数据
        async getUserInfo(context) {

            const result = await getUserInfo();

            //获取用户基本信息
            const sss = await getUserDetailById(result.userId)

            const userResult = {...result, ...sss }

            context.commit('setUserInfo', userResult)

            return userResult;
        },
        // 退出登录
        logout(context) {
            // 删除token
            context.commit("removeToken")
                // 删除用户数据
            context.commit("removeUserInfo")

            // 
            resetRouter();

            context.commit("permission/setRoutes", [], { root: true })
        }
    }
}