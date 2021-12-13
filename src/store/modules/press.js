import { coursePublisherList } from '@/api/course'
const press = {
  state: {
    pressList: [],//出版社列表
  },
  mutations: {
    setcoursePublisherList(stateObj, newValue) {
      const states = stateObj;
      states.pressList = newValue
    }
  },
  actions: {
    // 获取出版社列表分页
    async getcoursePublisherList({ commit }) {
      const params = {};
      try {
        const resData = await coursePublisherList(params);
        commit('setcoursePublisherList', resData.data.list);
        console.log("======")
        console.log(resData)
        return resData;
      } catch (error) {
        return Promise.reject();
      }
    }
  }
}


export default press;
