<template>
  <div class="login_page">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
          <el-form-item prop="username" class="login-item">
            <el-input
              @keyup.enter.native="submitForm('loginForm')"
              class="area"
              type="text"
              placeholder="用户名"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" class="login-item">
            <el-input
              @keyup.enter.native="submitForm('loginForm')"
              class="area"
              type="password"
              placeholder="密码"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
import JSEncrypt from 'jsencrypt';
import { login } from '@/api/user';
import {mapMutations} from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        username: 'xusiyi1993',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },
  mounted() {},
  methods: {
    ...mapMutations(['changeLogin']),
    showMessage(type, message) {
      this.$message({
        type: type,
        message: message
      });
    },
    submitForm(loginForm) {
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          let userinfo = this.loginForm;
          login({
            username: userinfo.username,
            password: this.RSAEncrypt(userinfo.password)
          })
            .then(res => {
              if (res.code == 0) {
                localStorage.setItem('token', JSON.stringify(res.data.token));
                // 假设登陆成功，则跳转到 index 组件
                this.$router.replace('/console');
              } else {
                console.log('账号密码不存在');
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login_page {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
  background-size: 100% 100%;
}
.form_contianer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 370px;
  border-radius: 5px;
  padding: 25px;
  text-align: center;
}
.form_contianer.titleArea {
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 22px;
  width: 100%;
  padding-bottom: 20px;
}
.form_contianer.titleArea.logo {
  width: 40px;
  margin-right: 10px;
}
.form_contianer.titleArea.title i {
  color: #ff6c60;
}

.loginForm.submit_btn {
  width: 100%;
  padding: 13px 0;
  font-size: 16px;
}

.manage_tip {
  margin-bottom: 20px;
}
.manage_tip.title {
  font-family: cursive;
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.manage_tip.logo {
  width: 60px;
  height: 60px;
}

.tiparea {
  text-align: left;
  font-size: 12px;
  color: #4cbb15;
  padding: 10px 0;
}
.tiparea.tip {
  margin-left: 54px;
}

.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
.loginForm.el-button--primary {
  background-color: #ff7c1a;
  border: 1px solid #ff7c1a;
}
.sanFangArea {
  border-top: 1px solid #dcdfe6;
  padding: 10px 0;
  display: none;
}
.sanFangArea.title {
  font-size: 14px;
  color: #8b9196;
  margin-bottom: 10px;
}
.sanFangArea ul li {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.sanFangArea ul li.svg-icon {
  font-size: 24px;
}
</style>
