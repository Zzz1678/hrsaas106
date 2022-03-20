<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">
    <!-- el-checkbox-group选中的是 当前用户所拥有的角色  需要绑定 当前用户拥有的角色-->
    <!-- 角色选项 -->
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :label="item.id" :key="item.id">{{
        item.name
      }}</el-checkbox>
    </el-checkbox-group>

    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from "@/api/setting";
import { getUserDetailById } from "@/api/user";
import { assignRoles } from "@/api/employees";
export default {
  data() {
    return {
      list: [], //a当前所有角色id
      roleIds: [], //当前用户拥有的角色id
    };
  },
  props: {
    showRoleDialog: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: String,
      default: null,
    },
  },
  created() {
    this.getRoleList();
  },

  methods: {
    async getRoleList() {
      const { rows } = await getRoleList({ page: 1, pagesize: 20 });
      this.list = rows;
    },
    // 获取角色id，这个方法在父组件中调用
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id);
      // 接口返回数结构后返回赋值给rolesId
      this.roleIds = roleIds;
    },
    // 给用户添加角色
    async btnOK() {
      await assignRoles({ id: this.userId, roleIds: this.roleIds });
      //   关闭窗体
      this.$emit("update:showRoleDialog", false);
    },
    // 取消按钮
    btnCancel() {
      this.roleIds = []; // 清空原来的数组
      this.$emit("update:showRoleDialog", false);
    },
  },
};
</script>

<style>
</style>