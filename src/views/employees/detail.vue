<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              ref="UserInfoForm"
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
              :model="userInfo"
              :rules="rules"
            >
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="userInfo.username" style="width: 300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password2">
                <el-input
                  v-model="userInfo.password2"
                  style="width: 300px"
                  type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUser">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人基本信息">
                <router-link :to="`/employees/print/${userId}?type=personal`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- <user-info /> -->
            <!-- 这里使用动态组件 ,引用变量需要在data中把组件赋值给变量-->
            <component :is="UserComponent" />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印岗位信息">
                <router-link :to="`/employees/print/${userId}?type=job`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- 放置内容 -->
            <!-- <user-info /> -->
            <!-- 这里使用动态组件 ,引用变量需要在data中把组件赋值给变量-->
            <component :is="JobComponent" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { saveUserDetailById } from "@/api/employees";
import { getUserDetailById } from "@/api/user";
import UserInfo from "./components/user-info.vue";
import JobInfo from "./components/job-info.vue";
export default {
  data() {
    return {
      UserComponent: UserInfo,
      JobComponent: JobInfo,
      userId: this.$route.params.id,
      userInfo: {
        username: "",
        password2: "",
      },
      rules: {
        username: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
        ],
        password2: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 9, message: "密码长度6-9位", trigger: "blur" },
        ],
      },
    };
  },
  components: {
    UserInfo,
    JobInfo,
  },
  created() {
    this.getUserDetailById();
  },
  methods: {
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.userId);
    },
    async saveUser() {
      try {
        await this.$refs.UserInfoForm.validate();
        await saveUserDetailById({
          ...this.userInfo,
          password: this.userInfo.password2,
        });
        this.$message.success("修改成功");
        // 调用退出登录接口，并且导航到登录也重新登录
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>