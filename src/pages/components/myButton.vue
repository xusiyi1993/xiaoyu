<template>
  <el-button type="primary" class="nomal">
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  name:'my-button',
  data(){
    return{
    }
  }
}
</script>

<style scoped lang="less">
.nomal{
  font-size: 14px;
}
</style>
