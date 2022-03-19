import Vue from 'vue'
import VueRouter from 'vue-router'

import AuthorsPage from "@/views/AuthorsPage";
import BooksPage from "@/views/BooksPage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Books',
    component: BooksPage,
  },
  {
    path: '/authors',
    name: 'Authors',
    component: AuthorsPage,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
