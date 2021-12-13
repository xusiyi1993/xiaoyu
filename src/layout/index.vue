<template>
  <div>
    <el-container>
      <el-header>
        <div>
          <img src="../assets/img/logo-min.png" alt="logo" />
          <HeadNav />
        </div>
        <div>
          <img class="user" :src="userInfo.portrait" alt="img" />
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              {{userInfo.username}}
              <i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="showPopup">修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <Sidebar />
        <el-main>
          <Bread />
          <div class="view">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 修改密码弹窗 -->
    <Popup ref="popup" />
  </div>
</template>

<script>
import HeadNav from './headNav.vue'
import Sidebar from './sideBar.vue'
import Popup from './popup.vue'
import Bread from './bread.vue'
import { mapActions } from 'vuex'
export default {
  name: 'console',
  data() {
    return {
    }
  },
  computed: {
    userInfo() {
      const { userInfo } = this.$store.state.user
      // console.log('----')
      // console.log(userInfo)
      return userInfo
    }
  },
  components: {
    HeadNav,
    Sidebar,
    Popup,
    Bread
  },
  mounted() {
    this.getAuthoritiesMenu(), this.getUserInfo()
  },
  methods: {
    ...mapActions(['getAuthoritiesMenu', 'getUserInfo', 'loginOut']),
    loginOut() {
      delete localStorage.token
      this.$router.push('/login')
    },
    showPopup: function() {
      this.$refs.popup.setPopup(true)
    },
  }
}
</script>

<style scoped lang="less">
.el-container {
  height: 100%;
  .el-header {
    background-color: #373d46;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      display: flex;
      align-items: center;
      .el-dropdown-link {
        color: white;
      }
      .el-dropdown:hover {
        cursor: pointer;
      }
    }
    img {
      max-height: 34px;
      max-width: 34px;
      float: left;
    }
    img.user {
      border-radius: 50%;
      border: white 1px solid;
      margin-right: 10px;
    }
  }
  .el-aside {
    background-color: #344156;
  }
  .el-main {
    padding: 20px;
    background-color: #f8f8f8;
    .view{
      margin-top: 20px;
      background-color: rgb(255, 255, 255);
    }
  }
}
</style>
