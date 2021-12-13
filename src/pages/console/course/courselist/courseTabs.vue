<template>
  <div>
    <!-- 这里是查询条件 -->
    <el-form :model="ruleForm" status-icon ref="ruleForm" :inline="true">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="topid">
        <select-tree @childTopFn="fatherTopFn" />
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
      <el-form-item label="状态" prop="enable">
        <el-select v-model="ruleForm.enable" @change="enableChange">
          <el-option label="全部" value></el-option>
          <el-option label="已显示" value="true"></el-option>
          <el-option label="未显示" value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <my-button class="search" @click.native="searchList" style="margin-left: 10px">查询</my-button>
      </el-form-item>
    </el-form>
    <el-button class="add" @click.native="showPopup">新增课程</el-button>
    <!-- style="height:600px; overflow:auto" -->
    <!-- 下面是表格 -->
    <div class="form">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        max-height="459"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="标题" prop="title" width="150"></el-table-column>
        <el-table-column label="主图" prop="img" width="80">
          <template slot-scope="scope">
            <img :src="scope.row.img" alt />
          </template>
        </el-table-column>
        <el-table-column label="顶级分类" prop="category" width="150" :formatter="getTopId"></el-table-column>
        <el-table-column label="当前分类" prop="category" width="100">
          <template slot-scope="scope">{{ scope.row.category.name }}</template>
        </el-table-column>
        <el-table-column label="内容类型" prop="type" width="150" :formatter="getType"></el-table-column>
        <el-table-column label="年级" prop="classGrade" width="150" :formatter="getGrade"></el-table-column>
        <el-table-column label="学期" prop="classVolume" width="100" :formatter="getVolume"></el-table-column>
        <el-table-column label="出版社" prop="coursePublisher" width="100">
          <template slot-scope="scope">{{ scope.row.coursePublisher.name }}</template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="100"></el-table-column>
        <el-table-column label="状态" prop="enable" width="100">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.enable">已显示</el-tag>
            <el-tag type="danger" v-else>未显示</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip width="300">
          <template slot-scope="scope">{{ scope.row.createTime | formatTime }}</template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.enable" @click="handleOut(scope.row, false)">
              <i class="el-icon-edit"></i>
              <span>下架</span>
            </el-button>
            <el-button type="text" v-else @click="handleOut(scope.row, true)">
              <i class="el-icon-edit"></i>
              <span>上架</span>
            </el-button>
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)">
              <i class="el-icon-edit"></i>编辑
            </el-button>
            <el-button class="del" type="text" @click="handleDelete(scope.$index, scope.row)">
              <i class="el-icon-delete"></i>删除
            </el-button>
            <el-button type="text">
              <i class="el-icon-edit"></i>复制小程序链接
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <my-button
      class="allDel"
      :class="{ allDel1: isA, allDel2: !isA }"
      @click.native="handleDeleteAll"
    >批量删除</my-button>
    <el-pagination
      layout="prev, pager, next"
      :current-page="pagination.pageIndextr"
      :page-size="pagination.pageSize"
      :total="pagination.totalCount"
      @current-change="handleCurrentChange"
      style="padding-bottom: 20px; text-align: center"
    ></el-pagination>
  </div>
</template>
<script>
import {
  coursePublisherDelete,
  coursePublisherEdit,
  courseList,
  courseShelves,
  coursePublisherList
} from '@/api/course'
import { getEnums } from '@/api/public'
import myButton from '@/pages/components/myButton'
import selectTree from './select-tree'
import { mapActions } from 'vuex'
export default {
  inject: ['reload'],
  name: 'course-tabs',
  props: ['isTrue'],
  data() {
    return {
      topType: '',
      coursePublisherId: 0,
      ruleForm: {
        title: '',
        topId: [],
        coursePublisherId: '所有出版社',
        classGrade: '全部年级',
        classVolume: '全部学期',
        enable: ''
      },
      activeName: 'second',
      multipleSelection: [],
      newArr: [],
      isA: true,
      input: '',
      name: '',
      sort: '',
      title: '',
      type: '',
      createTime: '',
      updateTime: '',
      id: '',
      tableData: [],
      pagination: {
        pageIndex: 1,
        pageSize: 20,
        totalCount: 100
      },
      CategoryType: [],
      ClassGrade: [],
      classGradeId: 0,
      ClassVolume: [],
      classVolumeId: 0,
      CourseLabel: [],
      CourseType: [],
      enable: ''
    }
  },
  computed: {
    //筛选一级分类
    topCategory() {
      const { categoryPageList } = this.$store.state.course
      const ctList = categoryPageList
      const topCategory = ctList.filter(item => item.parentId == 0)
      return topCategory
    },
    //出版社
    pList() {
      const { coursePublisherList } = this.$store.state.course
      const pList = coursePublisherList
      const pListAll = {
        id: 0,
        name: '所有出版社',
        sort: '',
        createTime: '',
        updateTime: ''
      }
      pList.unshift(pListAll)
      return pList
    }
  },
  components: {
    myButton,
    selectTree
  },
  mounted() {
    this.getList()
    this.$emit('childGrade', this.ClassGrade)
    this.$emit('childVolume', this.ClassVolume)
    this.$emit('childPlist', this.pList)
    this.getsetcategoryPage()
    this.getNeirong()
    this.getsetcoursePublisherList()
  },
  methods: {
    ...mapActions(['getsetcategoryPage', 'getsetcoursePublisherList']),
    //获取课程列表
    getList() {
      courseList({
        title: this.ruleForm.title,
        categoryId: this.topType,
        categoryType: 1,
        classVolume: this.classVolumeId,
        classGrade: this.classGradeId,
        enable: this.enable,
        coursePublisherId: this.coursePublisherId,
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize
      })
        .then(res => {
          if (res.code == 0) {
            this.tableData = res.data.list
            console.log('this.tableData')
            console.log(res.data.list)
            console.log('this.tableData')
            this.pagination.totalCount = res.data.pagination.totalCount
            console.log('总条数')
            console.log(res.data.pagination.totalCount)
          } else {
            console.log('列表数据获取失败')
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    //查询功能
    searchList() {
      console.log(this.ruleForm.title)
      console.log(this.topType)
      console.log(this.ruleForm.coursePublisher)
      console.log(this.ruleForm.classGrade)
      console.log(this.ruleForm.classVolume)
      console.log(this.ruleForm.enable)
      //调接口
      this.getList()
    },
    //点击页码
    handleCurrentChange(val) {
      this.pagination.pageIndex = val
      this.getList()
    },
    showPopup: function(val) {
      console.log(val)
      console.log(this.isTrue)
      this.$emit('changeIstrue', false)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      if (val.length > 0) {
        this.isA = false
      } else {
        this.isA = true
      }
      const Arr = []
      for (let i = 0; i < val.length; i++) {
        Arr.push(val[i].id)
      }
      this.newArr = Arr
    },
    //上下架
    handleOut(row, value) {
      console.log(row)
      console.log(value)
      courseShelves({
        ids: [row.id],
        value: value
      })
        .then(res => {
          console.log(res)
          this.getList()
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    //编辑
    handleEdit(index, row) {
      console.log(index, row)
      this.$refs.popup.setPopup(true)
      this.name = row.name
      this.sort = row.sort
      this.createTime = row.createTime
      this.updateTime = row.updateTime
      this.id = row.id
      this.title = '编辑出版社'
      this.type = 'change'
      coursePublisherEdit({
        id: row.id
      })
        .then(res => {
          if (res.code == 0) {
            console.log(res)
          } else {
            console.log('编辑接口请求数据获取失败')
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    //删除
    handleDelete(index, row) {
      coursePublisherDelete({
        ids: [row.id]
      })
        .then(res => {
          if (res.code == 0) {
            this.reload()
          } else {
            console.log('删除接口请求数据获取失败')
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    //批量删除
    handleDeleteAll() {
      coursePublisherDelete({
        ids: this.newArr
      })
        .then(res => {
          if (res.code == 0) {
            this.reload()
          } else {
            console.log('删除接口请求数据获取失败')
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    //格式转换
    //获取到枚举数据
    getNeirong() {
      console.log('xxxxxx')
      getEnums({
        types: [
          'CategoryType',
          'ClassGrade',
          'ClassVolume',
          'CourseLabel',
          'CourseType'
        ]
      })
        .then(res => {
          for (let i = 0; i < res.data.CategoryType.length; i++) {
            this.CategoryType.push(res.data.CategoryType[i])
          }
          console.log(this.CategoryType)
          for (let i = 0; i < res.data.ClassGrade.length; i++) {
            this.ClassGrade.push(res.data.ClassGrade[i])
          }
          //在年级数组里新增一个“全部年级”对象
          this.ClassGrade.unshift({
            value: '全部年级',
            key: 0
          })
          for (let i = 0; i < res.data.ClassVolume.length; i++) {
            this.ClassVolume.push(res.data.ClassVolume[i])
          }
          //在学期数组里新增一个“全部学期”对象
          this.ClassVolume.unshift({
            value: '全部学期',
            key: 0
          })
          for (let i = 0; i < res.data.CourseLabel.length; i++) {
            this.CourseLabel.push(res.data.CourseLabel[i])
          }
          for (let i = 0; i < res.data.CourseType.length; i++) {
            this.CourseType.push(res.data.CourseType[i])
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    //顶级分类
    getTopId(row, column) {
      const num = row[column.property].topId
      for (let i = 0; i < this.topCategory.length; i++) {
        if (num == this.topCategory[i].sort) {
          return this.topCategory[i].name
        }
      }
    },
    //内容类型
    getType(row, column) {
      const num = row[column.property]
      for (let i = 0; i < this.CourseType.length; i++) {
        if (num == this.CourseType[i].key) {
          return this.CourseType[i].value
        }
      }
    },
    // 年级
    getGrade(row, column) {
      const num = row[column.property]
      for (let i = 0; i < this.ClassGrade.length; i++) {
        if (num == this.ClassGrade[i].key) {
          return this.ClassGrade[i].value
        }
      }
    },
    // //年级传值
    // setClassGrade() {
    //   this.$emit('childGrade', this.ClassGrade)
    // },
    //学期
    getVolume(row, column) {
      const num = row[column.property]
      for (let i = 0; i < this.ClassVolume.length; i++) {
        if (num == this.ClassVolume[i].key) {
          return this.ClassVolume[i].value
        }
      }
    },
    //选择分类改变值
    fatherTopFn(val) {
      this.topType = val
    },
    //选择出版社
    coursePublisherChange(val) {
      console.log(val)
      this.coursePublisherId = this.pList.filter(item => item.name == val)[0].id
      console.log(this.coursePublisherId)
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
    enableChange(val) {
      console.log(val)
      this.enable = val
    }
  },
  watch: {
    ClassGrade: {
      deep: true,
      handler() {
        this.$emit('childGrade', this.ClassGrade)
      }
    },
    ClassVolume: {
      deep: true,
      handler() {
        this.$emit('childVolume', this.ClassVolume)
      }
    },
    pList: {
      deep: true,
      handler() {
        this.$emit('childPlist', this.pList)
      }
    }
  }
}
</script>
<style>
.input {
  width: 200px;
}
.el-table th > .cell {
  text-align: center;
}
div.cell {
  text-align: center !important;
}
</style>
<style scoped lang="less">
.search {
  margin-left: 20px;
}
.add {
  display: inline-block;
  margin: 20px;
}
.form {
  margin: 20px;
  .del {
    color: red;
    margin-left: 24px;
  }
}
.allDel {
  margin-left: 20px;
  margin-top: 0;
  margin-bottom: 20px;
  border: none;
}
.allDel1 {
  background-color: #fab6b6;
}
.allDel2 {
  background-color: #f56e6e;
}
.tagTrue {
  width: 100px;
  height: 24px;
  background-color: aquamarine;
}
</style>
