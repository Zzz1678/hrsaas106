import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' //引入进度条
import 'nprogress/nprogress.css' //引入进度条样式

// 定义白名单  所有不受权限控制的页面
const whiteList = ['/login', '/404'];
// 权限拦截 导航前置守卫 路由守卫  router
router.beforeEach(async function(to, from, next) {
    // 开启进度条
    NProgress.start();
    // 只有放过的时候才去获取用户资料
    // 是每次都获取吗
    // 如果当前vuex中有用户的资料的id 表示 已经有资料了 不需要获取了 如果没有id才需要获取
    if (store.getters.token) {
        // 有 判断路径是登陆直接导航到首页
        if (to.path === '/login') {
            // 已经登录直接导航到首页
            next('/')
                // 其他直接放行
        } else {
            if (!store.getters.userId) {
                // 如果没有id才表示当前用户资料没有获取过
                // async 函数所return的内容 用 await就可以接收到
                const { roles } = await store.dispatch('user/getUserInfo');

                // console.log("------------");
                // console.log(roles);
                // console.log("************");

                const routes = await store.dispatch("permission/FilterRoutes", roles.menus);
                // console.log(routes);
                // routes就是筛选得到的动态路由
                // 动态路由 添加到 路由表中 默认的路由表 只有静态路由 没有动态路由
                // addRoutes  必须 用 next(地址) 不能用next()
                router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }]);
                // 添加完动态路由之后
                next(to.path); // 相当于跳到对应的地址  相当于多做一次跳转 为什么要多做一次跳转
                // 进门了，但是进门之后我要去的地方的路还没有铺好，直接走，掉坑里，多做一次跳转，
                // 再从门外往里进一次，跳转之前 把路铺好，再次进来的时候，路就铺好了
            } else {
                next()
            }

        }
    } else {
        // 没有token的情况下 判断路径是否在白名单
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