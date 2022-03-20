import LayOut from '@/layout'

export default {
    path: "/employees",
    name: "employees",
    component: LayOut,
    children: [{
            path: "",
            name: "employees",
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
        },
        // 打印路由
        {
            path: 'print/:id?', // 二级默认路由
            component: () =>
                import ('@/views/employees/print.vue'), // 按需加载
            hidden: true,
            meta: {
                title: '打印', // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
                icon: 'people'
            }
        }
    ]
}