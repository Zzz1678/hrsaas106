<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button icon="el-icon-plus" size="small" type="primary"
                >新增角色</el-button
              >
            </el-row>
            <!-- 表格 -->
            <el-table border="" :data="list">
              <el-table-column
                type="index"
                align="center"
                label="序号"
                width="120"
              />
              <el-table-column
                align="center"
                prop="name"
                label="角色名称"
                width="240"
              />
              <el-table-column align="center" prop="description" label="描述" />
              <el-table-column align="center" label="操作">
                <!-- 作用域插槽 取到当前数据的行数据 -->

                <template slot-scope="{ row }">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary">编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="deleteRole(row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <!-- 分页组件 -->
              <el-pagination
                :page-size="page.pagesize"
                :total="page.total"
                :current-page="page.page"
                layout="prev,pager,next"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input
                  v-model="formdata.name"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="formdata.companyAddress"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="formdata.mailbox"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="formdata.remarks"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole } from "@/api/setting";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      list: [],
      // 分页
      page: {
        page: 1,
        pagesize: 10,
        total: 0,
      },
      formdata: {},
    };
  },
  computed: {
    // vuex辅助函数
    ...mapGetters(["companyId"]),
  },
  created() {
    this.getRoleList();
    this.getCompanyInfo();
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page);
      this.page.total = total;
      this.list = rows;
    },
    // 切换页码方法
    changePage(newPage) {
      this.page.page = newPage;
      this.getRoleList();
    },

    //获取公司信息接口
    async getCompanyInfo() {
      this.formdata = await getCompanyInfo(this.companyId);
    },

    // 删除公司角色
    async deleteRole(id) {
      try {
        await this.$confirm("确定要删除吗"); //此方法为promise对象需要等待执行完成后才可进入下一行 因此需要加上await修饰
        await deleteRole(id);
        this.getRoleList(); //重新获取数据
        this.$message.success("删除成功");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>