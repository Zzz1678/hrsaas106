<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <template v-slot:after>
          <el-button type="primary" size="small" @click="addPermission(1, '0')"
            >添加权限</el-button
          >
        </template>
      </page-tools>
      <!-- 表格 -->
      <!-- 表格 -->
      <el-table border :data="list" row-key="id">
        <el-table-column align="center" label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{row}">
            <el-button
              v-if="row.type === 1"
              type="text"
              @click="addPermission(2, row.id)"
              >添加</el-button
            >
            <el-button type="text" @click="editPerMission(row.id)"
              >编辑</el-button
            >
            <el-button type="text" @click="delPermission(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增和编辑弹层 -->
    <el-dialog :visible="showDialog" :title="showText" @close="btnCancel">
      <!-- 表单 -->
      <el-form
        ref="perForm"
        :model="formData"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="权限名称" prop="naem">
          <el-input v-model="formData.name" style="width: 90%"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width: 90%"></el-input>
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input
            v-model="formData.description"
            style="width: 90%"
          ></el-input>
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
            style="width: 90%"
          ></el-switch>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  updatePermission,
  addPermission,
  getPermissionDetail,
  delPermission,
  getPermissionList,
} from "@/api/permisson";
import { transListToTreeList } from "@/utils/index";
export default {
  data() {
    return {
      list: [],
      showDialog: false,
      formData: {
        name: "", // 名称
        code: "", // 标识
        description: "", // 描述
        type: "", // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: "", // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: "0", // 开启
      },
      rules: {
        name: [
          { required: true, message: "权限名称不能为空", trigger: "blur" },
        ],
        code: [
          { required: true, message: "权限标识不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getPermissionList();
  },
  computed: {
    showText() {
      return this.formData.id ? "编辑权限" : "新增权限";
    },
  },
  methods: {
    // 获取所有角色
    async getPermissionList() {
      // 转化树形结构并赋值给表单
      var sss = await getPermissionList()
      // console.log(JSON.stringify(sss));
      this.list = transListToTreeList(sss, "0");
      console.log(JSON.stringify(this.list));
    },
    // 删除
    async delPermission(id) {
      this.$confirm("确定删除吗")
        .then(() => {
          return delPermission(id);
        })
        .then(() => {
          this.$message.success("删除成功");
          // 重新拉取数据
          this.getPermissionList();
        });
    },
    // 编辑
    // 添加
    addPermission(type, pid) {
      // 访问权限type=1,按钮操作权限type=2
      // pid表示当前数据的父节点表示
      // 记录当前添加的类型和父类型
      this.formData.type = type;
      this.formData.pid = pid;
      // 添加弹层弹出
      this.showDialog = true;
    },
    btnOK() {
      this.$refs.perForm
        .validate()
        .then(() => {
          // 如果formdata有id说明是编辑
          if (this.formData.id) {
            //编辑权限
            return updatePermission(this.formData);
          }
          //添加权限
          return addPermission(this.formData);
        })
        .then(() => {
          // 提示添加成功
          this.$message.success("操作成功");
          // 重新拉取数据
          this.getPermissionList();
          // 关闭弹层
          this.showDialog = false;
        })
        .then(() => {
          this.formData = {
            name: "", // 名称
            code: "", // 标识
            description: "", // 描述
            type: "", // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
            pid: "", // 因为做的是树 需要知道添加到哪个节点下了
            enVisible: "0", // 开启
          };
        });
    },
    btnCancel() {
      this.formData = {
        name: "", // 名称
        code: "", // 标识
        description: "", // 描述
        type: "", // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: "", // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: "0", // 开启
      };
      // 移出校验
      this.$refs.perForm.resetFields();
      // 关闭弹层
      this.showDialog = false;
    },
    // 编辑权限方法
    async editPerMission(id) {
      // 获取该角色的详细信息赋值给formdata
      this.formData = await getPermissionDetail(id);
      // 显示弹层
      this.showDialog = true;
    },
  },
};
</script>

<style>
</style>