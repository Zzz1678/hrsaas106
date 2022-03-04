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
          <el-dropdown>
            <span>操作<i class="el-icon-arrow-down"></i> </span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉选项 -->
              <!-- 编辑部门和删除部门只会在子节点上显示 -->
              <el-dropdown-item>添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">编辑子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">删除子部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
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
};
</script>

<style>
</style>