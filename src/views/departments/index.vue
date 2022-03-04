<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!--组织架构内容-头部 -->
      <el-card class="tree-card">
        <!-- 放置内容 -->
        <tree-tolls :treeNode="company" :isRoot="true" />
        <!-- 右侧内容 树形组织架构 -->
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
          @node-click="handleNodeClick"
        >
          <!-- 传入内容 插槽 有都少节点就渲染多少个-->
          <tree-tolls slot-scope="{ data }" :treeNode="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTolls from "./components/tree-tools.vue";
export default {
  data() {
    return {
      departs: [
        {
          name: "总裁办",
          manager: "曹操",
          children: [{ name: "董事会", manager: "曹丕" }],
        },
        { name: "行政部", manager: "刘备" },
        { name: "人事部", manager: "孙权" },
      ],
      company: { name: "江苏传智播客教育科技股份有限公司", manager: "负责人" },
      defaultProps: {
        children: "children", //默认为children
        label: "name", //默认为label
      },
    };
  },
  components: {
    TreeTolls,
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
  },
};
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>