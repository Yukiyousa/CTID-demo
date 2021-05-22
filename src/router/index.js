import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import register from '../views/register.vue'
import home from '../views/home.vue'
import index from '../components/index.vue'
import profile from '../components/profile.vue'
import attack from '../components/attack.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    redirect: '/login' 
  },
  {
    path: '/login',
    name: 'login',
    component:login 
  },
  {
    path: '/register',
    name: 'register',
    component:register
  },
  {
    path:'/home',
    nane:home,
    component:home,
    redirect:'/index',
    children:[
        {
            path:'/index',
            nane:index,
            component:index,
        },
        {
          path:'/profile',
          nane:profile,
          component:profile,
        },
        {
          path:'/attack',
          nane:attack,
          component:attack,
        },
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
