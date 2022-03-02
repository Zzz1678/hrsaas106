import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' //引入进度条
import 'nprogress/nprogress.css' //引入进度条样式

// 定义白名单  所有不受权限控制的页面
const whiteList = ['/login', '/404'];
// 权限拦截 导航前置守卫 路由守卫  router
router.beforeEach(function(to, from, next) {
    // 开启进度条
    NProgress.start()
        //判断是否有token
    if (store.getters.token) {
        // 有 判断路径是登陆直接导航到首页
        if (to.path === '/login') {
            next('/')
                // 其他直接放行
        } else {
            next()
        }
    } else {
        // 无 判断路径是否在白名单
        if (whiteList.indexOf(to.path) > -1) {
            next()
        } else {
            // 判断路径 直接导航到登录页
            next("/login")
        }
    }
    // 关闭进度条
    NProgress.done();
});
// 导航后置守卫
router.afterEach(function() {
    NProgress.done();
})