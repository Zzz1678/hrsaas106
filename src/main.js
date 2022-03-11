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


import '@/icons' // icon
import '@/permission' // permission control

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
    // 如果想要中文版 element-ui，按如下方式声明
    // Vue.use(ElementUI)
Vue.config.productionTip = false


// 注册自定义指令
Object.keys(directives).forEach(key => Vue.directive(key, directives[key]))
    // 注册所有过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

// 注册自定义组件
Vue.use(Components)

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})