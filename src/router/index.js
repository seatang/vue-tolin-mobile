import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: '',
      path: '/',
      component: () => import('@/views/tabbar-layout'),
      children: [
        {
          name: 'home',
          path: '/',
          component: () => import('@/views/home')
        },
        {
          name: 'questions',
          path: '/questions',
          component: () => import('@/views/questions')
        },
        {
          name: 'myvideo',
          path: '/myvideo',
          component: () => import('@/views/myvideo')
        },
        {
          name: 'myself',
          path: '/myself',
          component: () => import('@/views/myself')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    },
    {
      name: 'search',
      path: '/search',
      component: () => import('@/views/search')
    },
    {
      name: 'search-result',
      path: '/search/:q',
      component: () => import('@/views/search-result')
    },
    {
      name: 'article-item',
      path: '/article/:articleId',
      component: () => import('@/views/article')
    },
    {
      name: 'user-self',
      path: '/user-self',
      component: () => import('@/views/user-self')
    }
  ]
})
