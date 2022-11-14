<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <!--组织架构内容-头部 -->
      <el-card class="tree-card">
        <!-- 放置内容 -->
        <tree-tolls
          :treeNode="company"
          :isRoot="true"
          @addDepts="addDepartment"
        />
        <!-- 右侧内容 树形组织架构 -->
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <!-- 传入内容 插槽 有都少节点就渲染多少个-->
          <tree-tolls
            slot-scope="{ data }"
            :treeNode="data"
            @updateDepts="getDepartment"
            @addDepts="addDepartment"
            @editDepts="editDepts"
          />
          
        </el-tree>
      </el-card>
    </div>
    <AddDept
      ref="addDept"
      :showDialog.sync="showDialog"
      :TreeNode="node"
      @addDepts="getDepartment"
    ></AddDept>
  </div>
</template>

<script>
import TreeTolls from "./components/tree-tools.vue";
import { getDepartments } from "@/api/departments";
import { transListToTreeList } from "@/utils/index";
import AddDept from "./components/add-dept.vue";

export default {
  name: "depart-index",
  data() {
    return {
      loading: false,
      departs: [],
      company: { name: "", manager: "" },
      defaultProps: {
        children: "children", //默认为children
        label: "name", //默认为label
      },
      showDialog: false,
      node: null, //记录当前点击的node节点
    };
  },
  components: {
    TreeTolls,
    AddDept,
  },
  created() {
    this.getDepartment();
  },

  methods: {
    async getDepartment() {
      this.loading = true;
      const result = await getDepartments();
      console.log(result);
      // console.log(result);
      this.company = {
        name: result.companyName,
        manager: "负责人",
        id: "",
      };
      this.departs = transListToTreeList(result.depts, "");
      // console.log(this.departs);
      this.loading = false;
    },
    addDepartment(node) {
      this.showDialog = !this.showDialog;
      this.node = node;
      // async addDepartments()
    },
    // 点击编辑触发的父组件的方法
    editDepts(data) {
      this.showDialog = true; // 显示新增组件弹层
      this.node = data; // 存储传递过来的node数据
      // 我们需要在这个位置 调用子组件的方法
      // 父组件 调用子组件的方法
      // 直接调用子组件中的方法 传入一个id
      // console.log(this.$refs.addDept);
      this.$refs.addDept.getDepartDetail(this.node.id);
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