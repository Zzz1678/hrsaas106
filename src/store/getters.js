const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token, // 将user模块下的token作为快捷方式放出来
    name: state => state.user.userInfo.username, // 将子模块中的对象中的名称开放出来
    userId: state => state.user.userInfo.userId,
    staffPhoto: state => state.user.userInfo.staffPhoto,
    companyId: state => state.user.userInfo.companyId // 建立对于user模块的companyId的快捷访问
}
export default getters