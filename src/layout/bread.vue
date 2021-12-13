<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, index) in breadMenus" :key="index">{{item.displayName}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'bread',
  data() {
    return {
    }
  },
  computed: {
    breadMenus() {
      const { authoritiesMenu } = this.$store.state.menu
      const menuList = []
      const arr1 = this.$route.matched
      for (let i = 0; i < arr1.length; i++) {
        menuList.push(arr1[i].path)
      }
      // console.log('------')
      // console.log(menuList)
      const breadMenus = []
      const breadMenus1 = authoritiesMenu.filter(
        (item) => (item.type == 1) & (menuList.indexOf('/' + item.name) !== -1)
      )
      breadMenus.push(breadMenus1[0])
      const breadMenus3 = authoritiesMenu.filter(
        (item) => (item.type == 3) & (item.url == menuList[1])
      )
      // console.log('333')
      // console.log(breadMenus)
      if (breadMenus3.length == 0) {
        const breadMenus2 = authoritiesMenu.filter(
          (item) => (item.type == 2) & (item.url == menuList[1])
        )
        // console.log('222')
        // console.log(breadMenus2)
        breadMenus.push(breadMenus2[0])
      }
      else {
        const breadMenus2 = authoritiesMenu.filter(
          (item) => (item.type == 2) & (item.id == breadMenus3[0].parentId)
        )
        // console.log(breadMenus2)
        breadMenus.push(breadMenus2[0])
        breadMenus.push(breadMenus3[0])
      }
      console.log(breadMenus)
      return breadMenus
    },
  },
  mounted() {},
  methods: {
  },
}
</script>

<style scoped lang="less">
.el-breadcrumb {
  font-size: 14px;
}
</style>
