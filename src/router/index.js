import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'

Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   name: 'home',
    //   path: '/',
    //   component: () => import('@/views/home')
    // },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    },
    {
      name: 'layout',
      path: '/',
      component: () => import('@/views/layout'),
      children: [
        {
          name: 'home',
          path: '',
          component: () => import('@/views/home')
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish')
        },
        {
          name: 'modify',
          path: '/publish/modify/:id',
          component: () => import('@/views/publish/modify')
        },
        {
          name: 'article-connent',
          path: '/connent',
          component: () => import('@/views/connent')
        },
        {
          name: 'article',
          path: '/article',
          component: () => import('@/views/article')
        }
      ]
    }
  ]
})

// 路由开始进入
router.beforeEach((to, from, next) => {
  // 页面的加载进度条动画
  nprogress.start()
  const userInfo = window.localStorage.getItem('user_info')
  if (to.path !== '/login') {
    if (!userInfo) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    if (userInfo) {
      next(false)
    } else {
      next()
    }
    next()
  }
})

// 路由结束进入
router.afterEach((to, from) => {
  nprogress.done()
})

export default router
