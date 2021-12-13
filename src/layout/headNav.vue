<template>
  <div>
    <el-menu
      class="el-menu-demo"
      :default-active="activeIndex"
      active-text-color="#E4007F"
      mode="horizontal"
      @select="handleSelect"
      router
    >
      <el-menu-item
        :index="`${index}`"
        v-for="(item, index) in topMenus"
        :key="index"
        :route="{name:item.name+''}"
      >{{ item.displayName }}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'head-nav',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['topMenus', 'allMenus']),
    activeIndex() {
      const { name } = this.$route
      return `${this.topMenus.findIndex(item =>
        new RegExp('^' + item.name.split('.')[0]).test(name)
      )}`
    }
  },
  mounted() {
    // this.getAuthoritiesMenu()
  },
  methods: {
    // ...mapActions(['getAuthoritiesMenu']),
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang="less">
.el-menu {
  margin-left: 20px;
  border: none;
  background-color: #373d46;
  .el-menu-item {
    color: white;
  }
  .el-menu-item:hover {
    background-color: #ccc;
    color: white;
  }
}
</style>
