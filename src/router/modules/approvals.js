import LayOut from '@/layout'

export default {
    path: "/approvals",
    name: "approvals",
    component: LayOut,
    children: [{
        path: "",
        component: () =>
            import ('@/views/approvals'),
        meta: {
            title: "审批",
            icon: 'tree-table'
        }
    }]
}