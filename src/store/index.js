import Vue from 'vue'
import Vuex from 'vuex'
// import { getUser, setUser } from '@/utils/userInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: window.localStorage.getItem('user')
  },
  mutations: {
    changUser (state, user) {
      // Object.assign(state.user, user)
      state.user = user
      // setUser('user', state.user)
      window.localStorage.setItem('user', JSON.stringify(state.user))
    }
  }
})
