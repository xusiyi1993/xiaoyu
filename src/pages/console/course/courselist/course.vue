<template>
  <div>
    {{ClassVolume}}
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="课程" name="course" style="margin:0 20px 0 20px">
        <course-tabs
          v-if="isTrue"
          @childGrade="fatherGrade"
          @childVolume="fatherVolume"
          @childPlist="fatherPlist"
          @changeIstrue="changeIstrue($event)"
          :isTrue="isTrue"
        />
        <course-change
          v-else
          :ClassGrade="ClassGrade"
          :ClassVolume="ClassVolume"
          :pList="pList"
          @changeIstrue="changeIstrue($event)"
          :isTrue="isTrue"
        />
      </el-tab-pane>
      <el-tab-pane label="公众号文章" name="second">公众号文章</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import courseTabs from './courseTabs'
import courseChange from './courseChange copy'
export default {
  inject: ['reload'],
  name: 'course',
  data() {
    return {
      isTrue: true,
      activeName: 'course',
      ClassGrade: [],
      ClassVolume: [],
      pList:[]
    }
  },
  computed: {},
  components: {
    courseTabs,
    courseChange
  },
  mounted() {
    this.fatherGrade()
    this.fatherVolume()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    fatherGrade(val) {
      console.log('xusiyi')
      console.log(val)
      this.ClassGrade = val
    },
    fatherVolume(val) {
      this.ClassVolume = val
    },
    fatherPlist(val) {
      this.pList = val
    },
    changeIstrue(val) {
      this.isTrue = val
    }
  }
}
</script>
<style scoped lang="less">
</style>
