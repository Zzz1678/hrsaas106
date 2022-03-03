import LayOut from '@/layout'

export default {
    path: "/departments",
    name: "departments",
    component: LayOut,
    children: [{
        path: "",
        component: () =>
            import ('@/views/departments'),
        meta: {
            title: "组织架构",
            icon: 'tree'
        }
    }]
}