import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        settings,
        user,
        permission,
        tagsView
    },
    getters,
    state: {
        list: [12, 34]
    },
    mutations: {
        updateList(state, data) {
            state.list = this.state.list.push(...data)
        }
    },
    actions: {
        yibu(context, result) {
            context.commit('updateList', result)
        }
    }
})

export default store