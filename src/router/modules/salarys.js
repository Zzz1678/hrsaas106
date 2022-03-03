import LayOut from '@/layout'

export default {
    path: "/salarys",
    name: "salarys",
    component: LayOut,
    children: [{
        path: "",
        component: () =>
            import ('@/views/salarys'),
        meta: {
            title: "薪资"
        }
    }]
}