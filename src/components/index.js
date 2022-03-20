// 全局自定义组件的注册
import PageTools from './PageTools';
import UploadExcel from './UploadExcel';
import ImageUpload from './ImageUpload';
import Print from 'vue-print-nb';
import ScreenFull from './ScreenFull';
import ThemePicker from './ThemePicker'
import Lang from './lang';
import TagsView from './TagsView';

export default {
    install(Vue) {
        Vue.component('PageTools', PageTools) // 注册工具栏组件
        Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
        Vue.component('ImageUpload', ImageUpload) // 注册导入上传组件
        Vue.use(Print) //注册打印组件
        Vue.component('ScreenFull', ScreenFull) // 注册全屏组件
        Vue.component('ThemePicker', ThemePicker) //动态主体设置
        Vue.component("Lang", Lang) //多语言配置
        Vue.component('TagsView', TagsView) //多页签
    }
}