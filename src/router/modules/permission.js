import LayOut from '@/layout'

export default {
    path: "/permission",
    name: "permissions",
    component: LayOut,
    children: [{
        path: "",
        name: "permissions",
        component: () =>
            import ('@/views/permission'),
        meta: {
            title: "权限管理",
            icon: 'lock'
        }
    }]
}