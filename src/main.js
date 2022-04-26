import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import Components from './components'
import * as directives from '@/directives/index'
import * as filters from '@/filters/index'
import CheckPermission from '@/mixin/checkPermission'
import i18n from '@/lang'


import '@/icons' // icon
import '@/permission' // permission control

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale });
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
})

// 注册自定义组件
Vue.use(Components);
// 注册混入的方法
Vue.mixin(CheckPermission)

Vue.config.productionTip = false


// 注册自定义指令
Object.keys(directives).forEach(key => Vue.directive(key, directives[key]))
    // 注册所有过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

// 创建vue实例
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
})

// render: h => h(App)是ES6的写法，其实就是如下内容的简写：

// render: function (createElement) {
//     return createElement(App);
// }
// 官方文档中是这样的，createElement 是 Vue.js 里面的 函数，这个函数的作
// 用就是生成一个 VNode节点，render 函数得到这个 VNode 节点之后，返回给
//  Vue.js 的 mount 函数，渲染成真实 DOM 节点，并挂载到根节点上。

// render: function (createElement) {
//    return createElement(
//      'h' + this.level,   // tag name 标签名称
//      this.$slots.default // 子组件中的阵列
//    )
//  }
// ************************
// vue中$el等属性：：：
// 属性：
// vm.$el
// 获取Vue实例关联的DOM元素；

// vm.$data
// 获取Vue实例的data选项（对象）

// vm.$options
// 获取Vue实例的自定义属性（如vm.$options.methods,获取Vue实例的自定义属性methods）

// vm.$refs
// 获取页面中所有含有ref属性的DOM元素（如vm.$refs.hello，获取页面中含有属性
// ref = “hello”的DOM元素，如果有多个元素，那么只返回最后一个）