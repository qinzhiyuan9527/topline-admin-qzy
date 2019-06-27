import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import './styles/base.css'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
// 配置 axios 的基础路由
// 也就是说配置了这个东西，你就不用每次都写长长的 http://xxxx
// 只需要，例如 axios({ url: '/authorizations' })
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/app/v1_0/'

// 请求拦截器
axios.interceptors.request.use(config => {
  const userIfon = JSON.parse(window.localStorage.getItem('user_info'))
  if (userIfon) {
    // config.headers.Authorization = `Bearer 123`
    config.headers.Authorization = `Bearer ${userIfon.token}`
  }

  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(response => {
  return response.data.data
}, error => {
  const status = error.response.status
  if (status === 401) {
    router.push({
      name: 'login'
    })
  }
  // console.dir(error)
  return Promise.reject(error)
})

// 往Vue原型对象中添加成员，尽量使用 $名字 起名字，目的是为了防止和组件中的成员冲突
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
