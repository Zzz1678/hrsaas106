import LayOut from '@/layout'

export default {
    path: "/employees",
    name: "employees",
    component: LayOut,
    children: [{
            path: "",
            component: () =>
                import ('@/views/employees'),
            meta: {
                title: "员工管理",
                icon: 'people'
            }
        },
        // 员工详情路由
        {
            path: 'detail/:id?',
            component: () =>
                import ('@/views/employees/detail'),
            hidden: true,
            mata: {
                title: "员工详情",
                icon: "people"
            }
        }
    ]
}