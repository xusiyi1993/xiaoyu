<template>
  <div>
    <el-aside width="widthLength">
      <div class="button">
        <el-button v-if="isCollapse" @click="isCollapse = false">三</el-button>
        <el-button v-else @click="isCollapse = true" style="width: 200px">| | |</el-button>
      </div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#344156"
        text-color="#fff"
        unique-opened
        router
      >
        <template v-for="item in menus">
          <el-menu-item :index="item.url + ''" :key="item.id" v-if="item.children.length==0">
            <i class="el-icon-menu"></i>
            <span slot="title">{{ item.displayName }}</span>
          </el-menu-item>
          <el-submenu :index="item.url + ''" :key="item.id" v-else>
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">{{ item.displayName }}</span>
            </template>
            <el-menu-item
              :index="item.url + ''"
              v-for="item in item.children"
              :key="item.id"
              style="padding-left: 56px;"
            >{{ item.displayName }}</el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'sidebar',
  data() {
    return {
      isCollapse: true,
      widthLength: '200px'
    }
  },
  computed: {
    ...mapGetters(['topMenus']),
    menus() {
      console.log(this.$store, this.$route)
      const { authoritiesMenu } = this.$store.state.menu
      const { name } = this.$route
      const topName = name.split('.')[0]
      const menus = authoritiesMenu
        .filter(item => item.topId)
        .filter(item => item.type == 2)
        .filter(item => new RegExp('^' + topName).test(item.name))
      const smenus = authoritiesMenu.filter(item => item.type == 3)

      for (let i = 0; i < menus.length; i++) {
        menus[i].children = []
        for (let j = 0; j < smenus.length; j++) {
          if (menus[i].id == smenus[j].parentId) {
            menus[i].children.push(smenus[j])
          }
        }
      }
      // console.log(menus)
      return menus
    }
  },
  mounted() {
    this.getAuthoritiesMenu()
  },
  methods: {
    ...mapActions(['getAuthoritiesMenu']),
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang="less">
.button {
  height: 30px;
  .el-button {
    background-color: #4a5064;
    height: 30px;
    width: 64px;
    line-height: 30px;
    padding: 0;
    color: white;
    border-radius: 0%;
    border: none;
  }
}
.el-menu {
  border: none;
  height: calc(100vh - 90px);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
