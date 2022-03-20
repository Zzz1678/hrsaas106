import LayOut from '@/layout'

export default {
    path: "/setting",
    name: "settings",
    component: LayOut,
    children: [{
        path: "",
        name: "settings",
        component: () =>
            import ('@/views/setting'),
        meta: {
            title: "设置",
            icon: 'setting'
        }
    }]
}