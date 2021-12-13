<template>
  <div id="selectTree">
    <el-tree-select
      :styles="styles"
      :data="dataLists"
      :selectParams="selectParams"
      :treeParams="treeParams"
      :treeRenderFun="_renderFun"
      @node-click="_nodeClickFun"
      ref="treeSelect"
    />
  </div>
</template>
<style>
#selectTree {
  display: flex;
  justify-content: space-between;
  width: 230px;
}
</style>
<script>
export default {
  name: 'selectTree',
  data() {
    return {
      styles: {
        width: '200px'
      },
      test: '',
      selectParams: {
        multiple: true,
        clearable: true,
        placeholder: '请选择分类'
      },
      topType: ''
    }
  },
  computed: {
    //筛选分类
    dataLists() {
      const categoryPageList = JSON.parse(
        JSON.stringify(this.$store.state.course.categoryPageList)
      )

      const dataLists = JSON.parse(JSON.stringify(categoryPageList)).filter(
        item => item.parentId == 0
      )
      const categoryList = JSON.parse(JSON.stringify(categoryPageList))
      for (let i = 0; i < dataLists.length; i++) {
        dataLists[i].child = []
        for (let j = 0; j < categoryList.length; j++) {
          if (categoryList[j].parentId == dataLists[i].id) {
            // dataLists[i].child.push(categoryList[j])
            categoryList[j].child = []
            for (let k = 0; k < categoryList.length; k++) {
              if (categoryList[k].parentId == categoryList[j].id) {
                categoryList[j].child.push(categoryList[k])
              }
            }
            dataLists[i].child.push(categoryList[j])
          }
        }
      }
      dataLists.unshift({
        chirld: [],
        createTime: '',
        icon: '',
        id: 0,
        link: '',
        name: '全部分类',
        parentId: '',
        sort: '',
        subName: '',
        topId: '',
        type: '',
        updateTime: ''
      })
      return dataLists
    },
    treeParams() {
      return {
        clickParent: true,
        'check-strictly': true,
        'default-expand-all': true,
        'expand-on-click-node': false,
        data: this.dataLists,
        props: {
          children: 'child',
          label: 'name',
          value: 'id'
        }
      }
    }
  },
  mounted() {
    this.treeParams.data = this.dataLists
    this.$refs.treeSelect.treeDataUpdateFun(this.dataLists)
  },
  methods: {
    // 下拉框修改
    _selectChange(val) {
      console.log(val, '<-select change')
    },
    // 树点击
    _nodeClickFun(data, node, vm) {
      console.log('this _nodeClickFun', this.values, this.dataLists, node)
      this.topType = node.data.id
      //将topType的值传到父组件中
      this.$emit('childTopFn', this.topType)
    },
    // 自定义render
    _renderFun(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
        </span>
      )
    }
  },
  components: {},
  watch: {
    dataLists: {
      deep: true,
      handler() {
        this.$refs.treeSelect.treeDataUpdateFun(this.dataLists)
      }
    }
  }
}
</script>
