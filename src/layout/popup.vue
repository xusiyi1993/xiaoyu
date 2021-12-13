<template>
  <el-dialog title="重置密码" :visible.sync="dialogFormVisible">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="ruleForm.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="againPassword">
        <el-input type="password" v-model="ruleForm.againPassword"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="savePassword">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import JSEncrypt from 'jsencrypt'
import { changePassword } from '@/api/public'
export default {
  name: 'popup',
  data() {
    //此处即表单发送之前验证  验证新密码与再次确认
    let validatePass2 = (rule, value, callback) => {
      if (value !== this.ruleForm.newPassword) {
        callback(new Error('与新密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      ruleForm: {
        newPassword: '',
        againPassword: ''
      },
      rules: {
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            type: 'string',
            message: '请输入不包含空格的字符',
            trigger: 'blur',
            transform(value) {
              if (value && value.indexOf(' ') === -1) {
                return value
              } else {
                return false
              }
            }
          },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        againPassword: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    password() {
      this.$commit.user('setNewPassword', this.getPassword)
      console.log(this.$store.state.user.password)
      return this.$store.state.user.password
    }
  },
  mounted() {},
  methods: {
    // 设置可见性
    setPopup: function(dialogFormVisible) {
      this.dialogFormVisible = dialogFormVisible
    },
    //重置表单
    // reform() {
    //   if (this.dialogFormVisible == true) {
    //     this.$refs['ruleForm'].resetFields()
    //   }
    // },
    savePassword(ruleForm) {
      this.dialogFormVisible = false
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          console.log(valid)
          const { newPassword } = this.ruleForm
          changePassword({ password: this.RSAEncrypt(newPassword) })
            .then(res => {
              this.$message({
                message: '密码修改成功',
                type: 'success'
              }),
              // 假设登陆成功，则跳转到 index 组件
              this.$router.replace('/login')
            })
            .catch(function(error) {
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
</style>
