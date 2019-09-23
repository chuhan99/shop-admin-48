import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Index from './components/Index.vue'

Vue.use(Router)

// 命名路由: 给路由起了一个名字
// 只要起了名字, 也可以通过名字的方式, 切换路由
// this.$router.push(路径)
// this.$router.push({ name: 路由的名字 })
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
