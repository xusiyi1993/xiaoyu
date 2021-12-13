<template>
  <div>
    <div class="search">
      <span style="font-size: 14px">出版社名称</span>
      <el-input
        class="input"
        v-model="name"
        placeholder="请输入出版社名称"
        style="margin-left: 10px"
      ></el-input>
      <my-button
        class="search"
        @click.native="searchList"
        style="margin-left: 10px"
        >查询</my-button
      >
      <el-button class="add" @click.native="showPopup">新增出版社</el-button>
    </div>
    <!-- style="height:600px; overflow:auto" -->
    <div class="form">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        max-height="555"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.createTime | formatTime
          }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)">
              <i class="el-icon-edit"></i>编辑
            </el-button>
            <el-button
              class="del"
              type="text"
              @click="handleDelete(scope.$index, scope.row)"
            >
              <i class="el-icon-delete"></i>删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <my-button
      class="allDel"
      :class="{ allDel1: isA, allDel2: !isA }"
      @click.native="handleDeleteAll"
      >批量删除</my-button
    >
    <el-pagination
      layout="prev, pager, next"
      :current-page="pagination.pageIndex"
      :page-size="pagination.pageSize"
      :total="pagination.totalCount"
      @current-change="handleCurrentChange"
      style="padding-bottom: 20px; text-align: center"
    ></el-pagination>
    <my-popup
      ref="popup"
      :inputName="name"
      :inputSort="sort"
      :inputTitle="title"
      :inputType="type"
      :createTime="createTime"
      :updateTime="updateTime"
      :id="id"
    />
  </div>
</template>

<script>
import {
  coursePublisherDelete,
  coursePublisherEdit,
  coursePublisherList,
} from '@/api/course'
import myButton from '@/pages/components/myButton'
import myPopup from './myPopup'
import { mapActions } from 'vuex'
export default {
  inject: ['reload'],
  name: 'keyword',
  data() {
    return {
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
        totalCount: 100,
      },
    }
  },
  computed: {},
  components: {
    myButton,
    myPopup,
  },
  mounted() {
    this.getList()
    console.log('tableData')
    console.log(this.tableData)
    this.getcoursePublisherList()
  },
  methods: {
    ...mapActions(['getcoursePublisherList']),
    getList() {
      coursePublisherList({
        name: this.name,
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize,
      })
        .then((res) => {
          if (res.code == 0) {
            this.tableData = res.data.list
            // console.log('this.tableData')
            // console.log(this.tableData)
            this.pagination.totalCount = res.data.pagination.totalCount
            // console.log('总条数')
            // console.log(res.data.pagination.totalCount)
          } else {
            console.log('列表数据获取失败')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    //查询功能
    searchList() {
      coursePublisherList({
        name: this.name,
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize,
      })
        .then((res) => {
          if (res.code == 0) {
            this.tableData = res.data.list
            this.pagination.totalCount = res.data.pagination.totalCount
            // console.log('条数')
            // console.log(res.data.pagination.totalCount)
          } else {
            console.log('列表数据获取失败')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    //点击页码
    handleCurrentChange(val) {
      this.pagination.pageIndex = val
      coursePublisherList({
        name: this.name,
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize,
      })
        .then((res) => {
          this.tableData = res.data.list
          this.pagination.pageIndex = res.data.pagination.pageIndex
          this.pagination.totalCount = res.data.pagination.totalCount
          // console.log(res)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    showPopup: function (val) {
      this.$refs.popup.setPopup(true)
      this.name = ''
      this.sort = ''
      this.title = '新增出版社'
      this.type = 'add'
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
        id: row.id,
      })
        .then((res) => {
          if (res.code == 0) {
            console.log(res)
          } else {
            console.log('编辑接口请求数据获取失败')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    //删除
    handleDelete(index, row) {
      coursePublisherDelete({
        ids: [row.id],
      })
        .then((res) => {
          if (res.code == 0) {
            this.reload()
          } else {
            console.log('删除接口请求数据获取失败')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    //批量删除
    handleDeleteAll() {
      coursePublisherDelete({
        ids: this.newArr,
      })
        .then((res) => {
          if (res.code == 0) {
            this.reload()
          } else {
            console.log('删除接口请求数据获取失败')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
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
</style>
