import LayOut from '@/layout'

export default {
    path: "/salarys",
    name: "salarys",
    component: LayOut,
    children: [{
        path: "",
        name: "salarys",
        component: () =>
            import ('@/views/salarys'),
        meta: {
            title: "薪资",
            icon: 'money'
        }
    }]
}