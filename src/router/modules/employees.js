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
            title: "员工管理"
        }
    }]
}