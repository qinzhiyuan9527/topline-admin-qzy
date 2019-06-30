import Vue from 'vue'
import App from './App.vue'
// import Vuex from 'vuex'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import JSONbig from 'json-bigint'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import './styles/base.css'
import 'nprogress/nprogress.css'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI)
// 配置 axios 的基础路由
// 也就是说配置了这个东西，你就不用每次都写长长的 http://xxxx
// 只需要，例如 axios({ url: '/authorizations' })
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/app/v1_0/'
axios.defaults.transformResponse = [function (data) {
  // data 是未经处理的后端响应数据：JSON 格式字符串
  // Do whatever you want to transform the data
  // return JSONbig.parse(data)
  try {
    // data 可能不是标准的Json 字符串 ，否则JSONbig.parse(data) 转换失败会报错
    return JSONbig.parse(data)
  } catch (err) {
    // 无法转换的数据会原样返回
    return data
  }
}]

// 请求拦截器
axios.interceptors.request.use(config => {
  // console.log(1111)
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
  // console.log(response)
  if (typeof response.data === 'object' && response.data.data) {
    return response.data.data
  } else {
    return response.data
  }
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
  store,
  render: h => h(App)
}).$mount('#app')
