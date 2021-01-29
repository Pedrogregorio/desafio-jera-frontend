import Vue from 'vue'
import VueRouter from 'vue-router'
import Page from '../views/Page.vue'
import Login from '../views/Login.vue'
import Lista from '../views/Lista.vue'
import Perfil from '../views/Perfil.vue'
import Cadastro from '../views/Cadastro.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'log',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/page',
    name: 'Page',
    component: Page
  },
  {
    path:'/lista',
    name: 'Lista',
    component: Lista
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: Cadastro
  },
  {
    path:'/perfil',
    name: 'Perfil',
    component: Perfil
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
