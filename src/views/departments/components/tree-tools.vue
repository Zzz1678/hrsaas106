<template>
  <!-- 传入内容 插槽 有都少节点就渲染多少个-->
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <!--左侧内容 -->
    <el-col
      ><span>{{ treeNode.name }}</span></el-col
    >
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <!-- 放置下拉菜单 -->
        <el-col>
          <el-dropdown @command="handleCommand">
            <span>操作<i class="el-icon-arrow-down"></i> </span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉选项 -->
              <!-- 编辑部门和删除部门只会在子节点上显示 -->
              <el-dropdown-item
                command="add"
                :disabled="!checkPermission('add-dept')"
                >添加子部门</el-dropdown-item
              >
              <el-dropdown-item
                v-if="!isRoot"
                command="emit"
                :disabled="!checkPermission('edit-dept')"
                >编辑子部门</el-dropdown-item
              >
              <el-dropdown-item
                v-if="!isRoot"
                command="del"
                :disabled="!checkPermission('del-dept')"
                >删除子部门</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from "@/api/departments";
export default {
  name: "treeTools",
  props: {
    //   定义属性
    treeNode: {
      type: Object,
      required: true,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleCommand(type) {
      if (type === "add") {
        this.$emit("addDepts", this.treeNode);
      } else if (type === "emit") {
        this.$emit("editDepts", this.treeNode);
      } else {
        //   提示确定是否删除 执行删除进入.then()  取消删除进入.catch()
        this.$confirm("你确定要删除吗？")
          .then(() => {
            return delDepartments(this.treeNode.id);
          })
          //   删除成功了进入这里
          .then(() => {
            //   更新数据
            this.$emit("updateDepts");
            this.$message.success("删除部门成功");
          });
      }
    },
  },
};
</script>

<style>
</style>