import LayOut from '@/layout'

export default {
    path: "/social",
    name: "social",
    component: LayOut,
    children: [{
        path: "",
        component: () =>
            import ('@/views/social'),
        meta: {
            title: "社保",
            icon: 'table'
        }
    }]
}