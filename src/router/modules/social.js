import LayOut from '@/layout'

export default {
    path: "/social",
    name: "social_securitys",
    component: LayOut,
    children: [{
        path: "",
        name: "social_securitys",
        component: () =>
            import ('@/views/social'),
        meta: {
            title: "社保",
            icon: 'table'
        }
    }]
}