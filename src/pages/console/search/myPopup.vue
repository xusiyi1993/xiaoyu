<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible">
    <el-form :model="ruleForm" :rules="rules" label-width="110px" ref="ruleForm">
      <el-form-item label="关键词名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveForm">确 定</el-button>
    </div>
    {{inputName}}{{inputSort}}
  </el-dialog>
</template>
<script>
import { keywordList, keywordSave } from '@/api/keyword'
import { mapActions } from 'vuex'
export default {
  inject: ['reload'],
  name: 'my-popup',
  props: [
    'inputName',
    'inputSort',
    'inputTitle',
    'inputType',
    'createTime',
    'updateTime',
    'id'
  ],
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      title: '',
      ruleForm: {
        name: '',
        sort: ''
      },
      rules: {
        name: [{ required: true, trigger: 'blur' }],
        sort: [
          { required: true, message: '请输入数字', trigger: 'blur' },
          { min: 0, max: 2, message: '长度在 0 到 2 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    inputTitle(newVal, oldVal) {
      this.title = newVal
    },
    inputName(newVal, oldVal) {
      console.log('kkk')
      console.log(newVal, oldVal)
      this.ruleForm.name = newVal
    },
    inputSort(newVal, oldVal) {
      this.ruleForm.sort = newVal
    }
  },
  computed: {
    keyword() {
      const { keyword } = this.$store.state.keyword
      this.$store.dispatch('getkeywordList', keyword)
      return keyword
    }
  },
  mounted() {},
  methods: {
    ...mapActions(['getkeywordSave']),
    // 设置可见性
    setPopup: function(dialogFormVisible) {
      this.dialogFormVisible = dialogFormVisible
    },
    resetForm: function(formName) {
      this.$refs[formName].resetFields()
    },
    saveForm(ruleForm) {
      this.dialogFormVisible = false
      console.log('type=====')
      console.log(this.inputType)
      //根据inputType的类型判断从新增进来还是从编辑进来
      const newObj = {}
      if (this.inputType == 'add') {
        (newObj.id = ''),
          (newObj.name = this.ruleForm.name),
          (newObj.sort = this.ruleForm.sort),
          (newObj.createTime = new Date),
          (newObj.updateTime = new Date)
      } else {
        (newObj.id = this.id),
          (newObj.name = this.ruleForm.name),
          (newObj.sort = this.ruleForm.sort),
          (newObj.createTime = this.createTime),
          (newObj.updateTime = this.updateTime)
      }
      console.log('ruleForm=====')
      console.log(this.ruleForm)
      keywordSave(newObj)
        .then(res => {
          console.log('res===========')
          console.log(res)
          if (res.code == 0) {
            this.reload()
          } else {
            console.log('新增接口请求数据获取失败')
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
</style>
