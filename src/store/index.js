import Vue from 'vue'
import Vuex from 'vuex'

import books from '@/store/modules/books'
import authors from "@/store/modules/authors";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [

  ],
  state: {

  },
  getters:{

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    books,
    authors
  }
})
