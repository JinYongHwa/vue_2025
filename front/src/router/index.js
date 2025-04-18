import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Write from "../views/Write.vue"
import View from "../views/View.vue"
import Modify from "../views/Modify.vue"

import Join from "../views/Join.vue"
import Login from "../views/Login.vue"

const routes = [
  {
    path:"/login",
    component:Login
  },
  {
    path:"/join",
    component:Join
  },
  {
    path:"/write",
    component:Write
  },
  {
    path:"/modify/:no",
    component:Modify
  },
  {
    path:"/view/:no",
    component:View
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
