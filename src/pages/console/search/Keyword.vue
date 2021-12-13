<template>
  <div>
    <my-button class="add" @click.native="showPopup">新增关键词</my-button>
    <!-- style="height:600px; overflow:auto" -->
    <div class="form">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        max-height="605"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.createTime |formatTime}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)">
              <i class="el-icon-edit"></i>编辑
            </el-button>
            <el-button class="del" type="text" @click="handleDelete(scope.$index, scope.row)">
              <i class="el-icon-delete"></i>删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <my-button
      class="allDel"
      :class="{allDel1:isA,allDel2:!isA}"
      @click.native="handleDeleteAll"
    >批量删除</my-button>
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
import { keywordDelete, keywordEdit } from '@/api/keyword'
import myButton from '../../components/myButton'
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
      name: '',
      sort: '',
      title: '',
      type: '',
      createTime: '',
      updateTime: '',
      id: ''
    }
  },
  computed: {
    tableData() {
      const { keyword } = this.$store.state.keyword
      return keyword
    }
  },
  components: {
    myButton,
    myPopup
  },
  mounted() {
    this.getkeywordList()
  },
  methods: {
    ...mapActions(['getkeywordList']),
    showPopup: function(val) {
      this.$refs.popup.setPopup(true)
      this.name = ''
      this.sort = ''
      this.title = '新增关键字'
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
    handleEdit(index, row) {
      console.log(index, row)
      this.$refs.popup.setPopup(true)
      this.name = row.name
      this.sort = row.sort
      this.createTime = row.createTime
      this.updateTime = row.updateTime
      this.id = row.id
      this.title = '编辑关键字'
      this.type = 'change'
      keywordEdit({
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
    handleDelete(index, row) {
      keywordDelete({
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
    handleDeleteAll() {
      keywordDelete({
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
    }
  }
}
</script>
<style>
.el-table th>.cell{
  text-align: center;
}
div.cell{
  text-align: center !important;
}
</style>
<style scoped lang="less">
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
