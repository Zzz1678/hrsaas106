<template>
  <el-dialog title="新增员工" :visible.sync="showDialog" @close="btnCancel">
    <el-form
      ref="addEmployee"
      :model="employeeForm"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="姓名:" prop="username">
        <el-input
          v-model="employeeForm.username"
          style="width: 50%"
          placeholder="请输入姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机:" prop="mobile">
        <el-input
          v-model="employeeForm.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="入职时间:" prop="timeOfEntry">
        <el-date-picker
          v-model="employeeForm.timeOfEntry"
          style="width: 50%"
          placeholder="请输入入职时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="聘用形式:" prop="formOfEmployment">
        <el-select
          v-model="employeeForm.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in Employees.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号:" prop="workNumber">
        <el-input
          v-model="employeeForm.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门:" prop="departmentName">
        <el-input
          v-model="employeeForm.departmentName"
          style="width: 50%"
          placeholder="请输入部门"
          @focus="getDepartments"
        />
        <el-tree
          v-if="showTree"
          v-loading="loading"
          :data="treeList"
          default-expand-all=""
          :props="{ label: 'name' }"
          @node-click="selectNode"
        />
      </el-form-item>
      <el-form-item label="转正时间:" prop="correctionTime">
        <el-date-picker
          v-model="employeeForm.correctionTime"
          style="width: 50%"
          placeholder="请输入转正时间"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 底部插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartments } from "@/api/departments";
import { transListToTreeList } from "@/utils/index";
import { addEmployee } from "@/api/employees";
import Employees from "@/api/constant/employees";
export default {
  name: "add-Employee",
  data() {
    return {
      Employees,
      showTree: false,
      treeList: [],
      loading: false,
      employeeForm: {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        timeOfEntry: "",
        correctionTime: "",
      },
      //   formLabelWidth: "120px",
      //校验规则：
      rules: {
        username: [
          { required: true, tigger: "blur", message: "用户名不能为空" },
          { min: 1, max: 10, message: "用户名为1-10个字" },
        ],
        mobile: [
          { required: true, tigger: "blur", message: "手机号不能为空" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            tigger: "blur",
          },
        ],
        formOfEmployment: [
          { required: true, message: "聘用形式不能为空", trigger: "blur" },
        ],
        workNumber: [
          { required: true, message: "工号不能为空", trigger: "blur" },
        ],
        departmentName: [
          { required: true, message: "部门不能为空", trigger: "change" },
        ],
        timeOfEntry: [
          { required: true, message: "入职时间不能为空", trigger: "blur" },
        ],
        correctionTime: [
          { required: true, message: "入职时间不能为空", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    showDialog: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    //获取员工部门
    async getDepartments() {
      this.showTree = true;
      this.laoding = true;
      const { depts } = await getDepartments();
      this.treeList = transListToTreeList(depts, "");
      this.laoding = false;
    },
    // 给部门输入框赋值
    selectNode(node) {
      this.employeeForm.departmentName = node.name;
      this.showTree = false;
    },
    // 取消按钮
    btnCancel() {
      this.employeeForm = {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        timeOfEntry: "",
        correctionTime: "",
      };
      this.$refs.addEmployee.resetFields();
      this.$emit("update:showDialog", false);
    },
    // 添加员工
    async btnOK() {
      try {
        await this.$refs.addEmployee.validate();
        await addEmployee(this.employeeForm);
        this.$parent.getEmployeeList();
        this.$message.success("添加成功");
        this.$parent.showDialog = false;
      } catch (error) {
        console.log(error);
        this.$message.error("添加失败");
      }
    },
  },
};
</script>

<style>
</style>