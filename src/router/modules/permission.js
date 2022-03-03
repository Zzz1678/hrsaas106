import LayOut from '@/layout'

export default {
    path: "/permission",
    name: "permission",
    component: LayOut,
    children: [{
        path: "",
        component: () =>
            import ('@/views/permission'),
        meta: {
            title: "权限管理",
            icon: 'lock'
        }
    }]
}