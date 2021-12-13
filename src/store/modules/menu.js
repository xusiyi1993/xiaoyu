import { getAuthoritiesMenu } from '@/api/public'
const menu = {
  state: {
    authoritiesMenu: [],//导航栏菜单
  },
  getters: {
    allMenus: state => {
      return state.authoritiesMenu
    },
    //顶部导航菜单
    topMenus: state => {
      var newarr = state.authoritiesMenu.filter(function (obj) {
        return obj.type == 1
      })
      return newarr
    },
    //控制台左侧导航一级菜单console
    consoleArr: state => {
      var newarr = state.authoritiesMenu.filter(function (obj) {
        return obj.type == 2 & obj.name.indexOf('console') == 0
      })
      return newarr
    },
    //控制台左侧导航一级菜单market
    marketArr: state => {
      var newarr = state.authoritiesMenu.filter(function (obj) {
        return obj.type == 2 & obj.name.indexOf('market') == 0
      })
      return newarr
    },
    //控制台左侧导航一级菜单system
    systemArr: state => {
      var newarr = state.authoritiesMenu.filter(function (obj) {
        return obj.type == 2 & obj.name.indexOf('system') == 0
      })
      return newarr
    },
  },
  mutations: {
    setAuthoritiesMenu(stateObj, newValue) {
      const states = stateObj;
      states.authoritiesMenu = newValue
    }
  },
  actions: {
    // 获取导航菜单列表
    async getAuthoritiesMenu({ commit }) {
      const params = {};
      try {
        const resData = await getAuthoritiesMenu(params);
        commit('setAuthoritiesMenu', resData.data.list);
        return resData;
      } catch (error) {
        return Promise.reject();
      }
    }
  }
}


export default menu;
