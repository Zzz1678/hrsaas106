<template >
  <!-- 放置表单组件 -->
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
    <!-- 表单数据 -->
    <el-form
      ref="deptForm"
      label-width="120px"
      :model="formData"
      :rules="rules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          style="width: 80%"
          placeholder="1-50个字符"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          style="width: 80%"
          placeholder="1-50个字符"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          @focus="getEmployees"
          v-model="formData.manager"
          style="width: 80%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 确定和取消 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="medium" @click="btnOK">确定</el-button>
        <el-button size="medium" type="primary" @click="btnCancel"
          >取消</el-button
        >
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import {
  getDepartments,
  addDepartments,
  getDepartDetail,
  updateDepartments,
} from "@/api/departments";
import { getEmployeeSimple } from "@/api/employees";

export default {
  name: "addDept",
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    TreeNode: {
      type: Object,
      default: null,
      //   required: true,
    },
  },
  data() {
    // 现在定义一个函数 这个函数的目的是 去找 同级部门下 是否有重复的部门名称
    const chkecNameRepate = async (rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getDepartments();
      //  检查重复规则 需要支持两种 新增模式 / 编辑模式
      // depts是所有的部门数据
      // 如何去找技术部所有的子节点
      //判断是新增还是编辑
      let isRepeat = false;
      if (this.formData.id) {
        isRepeat = depts
          .filter(
            (item) =>
              item.pid === this.formData.pid && item.id !== this.TreeNode.id
          )
          .some((item) => item.name === value);
      } else {
        isRepeat = depts
          .filter((item) => item.pid === this.TreeNode.id)
          .some((item) => item.name === value);
      }

      isRepeat
        ? callback(new Error(`同级部门下已经有${value}的部门了`))
        : callback();
    };
    // 检查编码重复
    const chackCodeRepate = async (rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getDepartments();

      let isRepate = false;
      if (this.formData.id) {
        // 编辑模式
        isRepate = depts.some(
          (item) => item.id !== this.formData.id && item.code === value && value
        );
      } else {
        // 新增模式
        isRepate = depts.some((item) => item.code === value && value); // 这里加一个 value不为空 因为我们的部门有可能没有code
      }
      isRepate
        ? callback(new Error(`组织架构中下已经有${value}编码了`))
        : callback();
    };
    return {
      peoples: [],
      formData: {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      },
      rules: {
        name: [
          { required: true, message: "部门名称不能为空", trigger: "blur" },
          { min: 1, max: 50, message: "姓名要求1-50个字符", trigger: "blur" },
          { trigger: "blur", validator: chkecNameRepate },
        ],
        code: [
          { required: true, message: "部门编码不能为空", trigger: "blur" },
          { min: 1, max: 50, message: "姓名要求1-50个字符", trigger: "blur" },
          { trigger: "blur", validator: chackCodeRepate },
        ],
        manager: [
          { required: true, message: "部门负责人不能为空", trigger: "blur" },
        ],
        introduce: [
          { required: true, message: "部门介绍不能为空", trigger: "blur" },
          { min: 1, max: 50, message: "姓名要求1-50个字符", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    //
    showTitle() {
      return this.formData.id ? "编辑部门" : "新增部门";
    },
  },
  methods: {
    // 获取员工简单列表
    async getEmployees() {
      const result = await getEmployeeSimple();
      // console.log(result);
      this.peoples = result;
    },
    // 点击确定提交数据
    btnOK() {
      // 获取表单节点手动校验;
      this.$refs.deptForm.validate(async (isOK) => {
        // 如果校验成功判断是新增还是编辑
        if (isOK) {
          if (this.formData.id) {
            // 编辑模式  调用编辑接口
            await updateDepartments(this.formData);
          } else {
            // 这里我梦将id设置成子分部门的pid
            // 调用新增接口 添加父部门的id
            await addDepartments({ ...this.formData, pid: this.TreeNode.id });
          }

          // 更新数据
          this.$emit("addDepts");
          this.$emit("update:showDialog", false);
          // 关闭dialog的时候组件为自动的调用close事件重置我们的组件数据
        }
      });
    },
    btnCancel() {
      this.formData = {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      };
      this.$refs.deptForm.resetFields(); //重置表单数据
      this.$emit("update:showDialog", false);
    },
    // 获取详情方法
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id);
      console.log(this.formData);
      // props传值是异步的
    },
  },
};
</script>

<style>
</style>