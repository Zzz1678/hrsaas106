import LayOut from '@/layout'

export default {
    path: "/attendances",
    name: "attendances",
    component: LayOut,
    children: [{
        path: "",
        component: () =>
            import ('@/views/attendances'),
        meta: {
            title: "考勤"
        }
    }]
}