<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input type="text" v-model="ruleForm.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input type="author" v-model="ruleForm.author" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="topid">
        <select-tree @childTopFn="fatherTopFn" />
      </el-form-item>
      <el-form-item label="年级" prop="classGrade">
        <el-select v-model="ruleForm.classGrade" @change="classGradeChange">
          <el-option
            v-for="(item, index) in ClassGrade"
            :key="index"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学期" prop="classVolume">
        <el-select v-model="ruleForm.classVolume" @change="classVolumeChange">
          <el-option
            v-for="(item, index) in ClassVolume"
            :key="index"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出版社" prop="coursePublisherId">
        <el-select v-model="ruleForm.coursePublisherId" @change="coursePublisherChange">
          <el-option
            v-for="(item, index) in pList"
            :key="index"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="enable">
        <el-select v-model="ruleForm.enable">
          <el-option label="已显示" value="true"></el-option>
          <el-option label="未显示" value="false"></el-option>
        </el-select>
      </el-form-item>
      <!-- 浏览数 -->
      <el-form-item label="浏览数" prop="views">
        <el-input type="number" v-model="ruleForm.views" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 下载数 -->
      <el-form-item label="下载数" prop="downloads">
        <el-input type="number" v-model="ruleForm.downloads" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 排序 -->
      <el-form-item label="排序" prop="sort">
        <el-input type="number" v-model="ruleForm.sort" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 标签属性 -->
      <el-form-item label="标签属性" prop="tag">
        <el-checkbox-group v-model="checkLists">
          <el-checkbox label="轮播"></el-checkbox>
          <el-checkbox label="最新"></el-checkbox>
          <el-checkbox label="热门"></el-checkbox>
          <el-checkbox label="推荐"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- 主图 -->
      <el-form-item label="上传主图" prop="photo">
        <uploadFile :limit="1" list-type="picture-card" :file-list="[]" :on-success="handleUploadSuccess" :on-remove="handleUploadRemove" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    {{isTrue}}
  </div>
</template>
<script>
import selectTree from './select-tree'
import uploadFile from './UploadFile'
import { mapActions } from 'vuex'
export default {
  inject: ['reload'],
  name: 'course-change',
  props: ['ClassGrade', 'ClassVolume', 'isTrue', 'pList'],
  data() {
    return {
      checkLists: [],
      topType: '',
      CategoryType: [],
      classGradeId: 0,
      classVolumeId: 0,
      CourseLabel: [],
      CourseType: [],
      enable: '',
      //照片
      dialogImageUrl: '',
      dialogVisible: false,
      //照片结束
      ruleForm: {
        title: '',
        author: '',
        topid: '',
        classGrade: '全部年级',
        classVolume: '全部学期',
        coursePublisherId: '所有出版社',
        enable: '已显示',
        views: '',
        downloads: '',
        sort: '',
        tag: ''
      },
      rules: {
        title: [{ trigger: 'blur' }],
        author: [{ trigger: 'blur' }],
        topid: [{ trigger: 'blur' }]
      }
    }
  },
  computed: {},
  components: {
    selectTree,
    uploadFile
  },
  mounted() {
    this.getsetcategoryPage()
    this.getsetcoursePublisherList()
  },
  methods: {
    ...mapActions(['getsetcategoryPage', 'getsetcoursePublisherList']),
    //选择分类改变值
    fatherTopFn(val) {
      this.topType = val
    },
    //选择年级
    classGradeChange(val) {
      console.log(val)
      // this.ruleForm.classGrade = val
      this.classGradeId = this.ClassGrade.filter(
        item => item.value == val
      )[0].key
    },
    //选择学期
    classVolumeChange(val) {
      console.log(val)
      this.classVolumeId = this.ClassVolume.filter(
        item => item.value == val
      )[0].key
    },
    //选择出版社
    coursePublisherChange(val) {
      console.log(val)
      this.coursePublisherId = this.pList.filter(item => item.name == val)[0].id
      console.log(this.coursePublisherId)
    },
    //提交
    submitForm() {
      this.$emit('changeIstrue', true)
      console.log(this.isTrue)
    },
    handleUploadRemove(file,fileList){},
     handleUploadSuccess(res,file,fileList){
       console.log(res)
     },
  },
  watch: {}
}
</script>
<style>
/* div.el-upload.el-upload--picture-card{
  display: none;
} */
</style>
