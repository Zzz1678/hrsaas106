// import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
// import { login, getUserInfo, getUserDetailById } from '@/api/user'
// import { resetRouter } from '@/router'

// export default {
//     namespaced: true,
//     state: {
//         token: getToken(), //设置token的共享状态// 设置token初始状态   token持久化 => 放到缓存中
//         userInfo: {}
//     },
//     // 修改状态
//     mutations: {
//         // 设置token
//         setToken(state, token) {
//             state.token = token // 设置token  只是修改state的数据  123 =》 1234
//                 // vuex变化 => 缓存数据
//             setToken(token) // vuex和 缓存数据的同步
//         },
//         // 删除缓存
//         removeToken(state) {
//             state.token = null; // 删除vuex的token
//             removeToken() // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
//         },
//         // 存储用户数据
//         setUserInfo(state, data) {
//             state.userInfo = data;
//         },
//         // 删除用户数据
//         removeUserInfo(state) {
//             state.userInfo = {}
//         }
//     },
//     actions: {
//         async login(context, data) {
//             // 经过响应拦截器的处理之后 这里的result实际上就是 token
//             const result = await login(data); // 实际上就是一个promise  result就是执行的结果
//             // axios默认给数据加了一层data
//             // 表示登录接口调用成功 也就是意味着你的用户名和密码是正确的
//             // 现在有用户token
//             // actions 修改state 必须通过mutations

//             context.commit("setToken", result)

//             // 存入时间戳
//             setTimeStamp()
//         },
//         // 调用接口获取用户数据
//         async getUserInfo(context) {

//             const result = await getUserInfo();

//             //获取用户基本信息
//             const sss = await getUserDetailById(result.userId)

//             const userResult = {...result, ...sss }

//             context.commit('setUserInfo', userResult)

//             return userResult;
//         },
//         // 退出登录
//         logout(context) {
//             // 删除token
//             context.commit("removeToken")
//                 // 删除用户数据
//             context.commit("removeUserInfo")

//             // 
//             resetRouter();

//             context.commit("permission/setRoutes", [], { root: true })
//         }
//     }
// }

import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router'
// 状态
const state = {
    token: getToken(), // 设置token为共享状态 初始化vuex的时候 就先从缓存中读取
    userInfo: {} // 这里定义一个空对象 为什么要定义空对象
}
const mutations = {
    setToken(state, token) {
        state.token = token // 将数据设置给vuex
            // 同步给缓存
        setToken(token)
    },
    removeToken(state) {
        state.token = null // 将vuex的数据置空
        removeToken() // 同步到缓存
    },
    setUserInfo(state, result) {
        // 更新一个对象
        state.userInfo = result // 这样是响应式
            // state.userInfo = { ...result } // 这样也是响应式 属于浅拷贝
            // state.userInfo['username'] = result // 这样才不是响应式
    },
    removeUseInfo(state) {
        state.userInfo = {}
    }
}
const actions = {
    async login(context, data) {
        // 调用api接口
        const result = await login(data) // 拿到token
        context.commit('setToken', result) // 设置token
            // 拿到token说明登录成功
        setTimeStamp() // 设置当前的时间戳
    },
    async getUserInfo(context) {
        const result = await getUserInfo()
            // 获取用户的详情 用户的详情数据
        const baseInfo = await getUserDetailById(result.userId)
        context.commit('setUserInfo', {...result, ...baseInfo }) // 提交到mutations
        return result // 这里为什么要return呢 这里是给我们后期做权限的时候 留下的伏笔
    },
    // 登出操作
    logout(context) {
        // 删除token
        context.commit('removeToken')
            // 删除用户资料
        context.commit('removeUseInfo')
            // 重置路由
        resetRouter() // 重置路由
            // 去设置权限模块下路由为初始状态
            // Vuex子模块怎么调用子模块的action 都没加锁的情况下 可以随意调用
            // 不加命名空间的情况下的 所有的mutations和action都是挂在全局上的 所以可以直接调用
            // 但是加了命名空间的子模块 怎么调用另一个加了命名空间的子模块的mutations
            // 加了命名空间的context指的不是全局的context
            // mutations名称 载荷 payload 第三个参数  { root: true } 调用根级的mutations或者action
        context.commit('permission/setRoutes', [], { root: true })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}