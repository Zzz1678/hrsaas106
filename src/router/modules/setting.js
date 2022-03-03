import LayOut from '@/layout'

export default {
    path: "/setting",
    name: "setting",
    component: LayOut,
    children: [{
        path: "",
        component: () =>
            import ('@/views/setting'),
        meta: {
            title: "薪资",
            icon: 'setting'
        }
    }]
}