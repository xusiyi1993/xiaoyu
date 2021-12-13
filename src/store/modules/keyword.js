import { keywordList } from '@/api/keyword'
const keyword = {
  state: {
    keyword: [],//关键字
  },
  mutations: {
    setkeywordList(stateObj, newValue) {
      const states = stateObj;
      states.keyword = newValue
    },
  },
  actions: {
    //获取关键字列表
    async getkeywordList({ commit }) {
      const params = {};
      try {
        const resData = await keywordList(params);
        commit('setkeywordList', resData.data.list);
        console.log("bbbbb")
        console.log(resData)
        return resData;
      } catch (error) {
        return Promise.reject();
      }
    },
  }
}

export default keyword;
