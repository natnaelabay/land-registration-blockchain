import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/views/Default/Index'
import Home from '@/views/Index'
import Login from '@/views/Login'
import Transactions from '@/views/Transactions'
import Admin from '@/views/Dashboard'
import Profile from '@/views/Profile'
import Register from '@/views/Register'
import AdminHome from '@/views/admin/Home'
import ProfileHome from '@/views/user/Home'
import LandGallery from '@/views/user/LandGallery'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'index',
      component: Home,
      children: [
        {
          path: '',
          name: 'home',
          component: Landing
        },
        {
          path: '/login',
          name: 'Login',
          component: Login
        },
        {
          path: '/register',
          name: 'Register',
          component: Register
        },
        {
          path: '/transactions',
          name: 'transactions',
          component: Transactions
        },
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: '',
          name: 'admin-home',
          component: AdminHome
        }
      ]
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      children: [
        {
          path: '',
          name: 'profile-home',
          component: ProfileHome
        },
        {
          path: '/land-gallery',
          name: 'land-gallery',
          component: LandGallery
        },

      ]
    },


  ],
  mode: "history"
})
