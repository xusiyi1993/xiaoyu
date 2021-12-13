import { categoryPage, coursePublisherList } from '@/api/course'
const course = {
  state: {
    categoryPageList: [],//课程分类数据
    coursePublisherList: []//出版社数据
  },
  mutations: {
    setcategoryPage(stateObj, newValue) {
      console.log(newValue)
      const states = stateObj;
      states.categoryPageList = [...newValue]
    },
    setcoursePublisherList(stateObj, newValue) {
      console.log(newValue)
      const states = stateObj;
      states.coursePublisherList = [...newValue]
    },
  },
  actions: {
    //获取课程分类
    async getsetcategoryPage({ commit }) {
      const params = {};
      try {
        const resData = await categoryPage(params);
        commit('setcategoryPage', resData.data.list);
        console.log("cccccc")
        console.log(resData)
        return resData;
      } catch (error) {
        return Promise.reject();
      }
    },
    //获取出版社分类
    async getsetcoursePublisherList({ commit }) {
      const params = {};
      try {
        const resData = await coursePublisherList(params);
        commit('setcoursePublisherList', resData.data.list);
        console.log(resData)
        return resData;
      } catch (error) {
        return Promise.reject();
      }
    },
  }
}

export default course;
