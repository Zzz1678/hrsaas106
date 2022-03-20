import store from '@/store'

// 做一个混入对象
export default {
    // 把方法混入所有的组件
    methods: {
        // 检查权限要么有要么没有
        checkPermission(key) {
            const { userInfo } = store.state.user;
            if (userInfo.roles.points && userInfo.roles.points.length) {
                return userInfo.roles.points.some(item => item === key)
            }
            return false;
        }
    }
}