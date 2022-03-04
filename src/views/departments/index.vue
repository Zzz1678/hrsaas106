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
          <tree-tolls
            slot-scope="{ data }"
            :treeNode="data"
            @updateDepts="getDepartments"
          />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTolls from "./components/tree-tools.vue";
import { getDepartments } from "@/api/departments";
import { transListToTreeList } from "@/utils/index";

export default {
  data() {
    return {
      departs: [],
      company: { name: "", manager: "" },
      defaultProps: {
        children: "children", //默认为children
        label: "name", //默认为label
      },
    };
  },
  components: {
    TreeTolls,
  },
  created() {
    this.getDepartments();
  },

  methods: {
    handleNodeClick(data) {
      console.log(data);
    },

    async getDepartments() {
      const result = await getDepartments();
      // console.log(result);
      // console.log(result);
      this.company = {
        name: result.companyName,
        manager: "负责人",
      };
      this.departs = transListToTreeList(result.depts, "");
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