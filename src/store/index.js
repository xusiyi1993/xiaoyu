import Vue from 'vue'
import Vuex from 'vuex'
// if(process.env.NODE_ENV === "development"){
Vue.use(Vuex)
// } 

import menu from './modules/menu'
import user from './modules/user'
import keyword from './modules/keyword'
import press from './modules/press'
import course from './modules/course'


export default new Vuex.Store({
  modules: {
    menu,
    user,
    keyword,
    press,
    course
  }
});

