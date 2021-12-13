import { getUserInfo, loginOut, refreshToken } from '@/api/public'
const user = {
  state: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',//token
    userInfo: {},//用户信息
  },
  mutations: {
    //改变登录状态存储token
    changeLogin(state, user) {
      state.token = user.token
      localStorage.setItem('token', user.token)
    },
    //获取用户信息
    setUserInfo(stateObj, newValue) {
      const states = stateObj;
      states.userInfo = newValue
    },
    //刷新token
    setrefreshToken(stateObj, newValue) {
      const states = stateObj;
      states.token = newValue
    },
  },
  actions: {
    // 获取用户信息
    async getUserInfo({ commit }) {
      const params = {};
      try {
        const resData = await getUserInfo(params);
        commit('setUserInfo', resData.data);
        return resData;
      } catch (error) {
        return Promise.reject();
      }
    },
    // 登出
    async loginOut({ commit }) {
      const params = {};
      try {
        const resData = await loginOut(params);
        commit('setUserInfo', resData.data);
        console.log(resData)
        return resData;
      } catch (error) {
        return Promise.reject();
      }
    },
    //刷新token
    async getrefreshToken({ commit }) {
      const params = {};
      try {
        const resData = await refreshToken(params);
        commit('setrefreshToken', resData.data);
        console.log(resData)
        return resData;
      } catch (error) {
        return Promise.reject();
      }
    },
  }
}

export default user;
