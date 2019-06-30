// 2. 配置
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user_info'))
  },
  mutations: {
    changeUser (state, data) {
      // 修改容器中的用户信息。对象拷贝，将 data 中的数据成员拷贝到 state.user 中
      Object.assign(state.user, data)
      // 将修改之后的用户信息保存到本地存储
      window.localStorage.setItem('user_info', JSON.stringify(state.user))
      // console.log(data)
    }
  }
})

export default store
