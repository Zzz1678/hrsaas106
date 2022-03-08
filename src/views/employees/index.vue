<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共166条记录</span>
        <template slot="after">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="list">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template v-slot="{ row }">
              <el-switch :value="row.enableState === 1"></el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="username"
            label="操作"
            sortable=""
            fixed="right"
            width="280"
          >
            <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button
                type="text"
                size="small"
                @click="deleteEmployees(row.id)"
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
          <el-pagination
            layout="prev, pager, next"
            :total="page.total"
            :page-size="page.size"
            :current-page="page.page"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from "@/api/employees";
import Employees from "@/api/constant/employees";
export default {
  data() {
    return {
      loading: false,
      list: [],
      page: {
        page: 1, // 当前页码
        size: 100,
        total: 0, // 总数
      },
    };
  },

  created() {
    this.getEmployeeList();
  },
  methods: {
    // 改变页码
    changePage(newPage) {
      this.page.page = newPage;
      this.getEmployeeList();
    },
    // 获取员工列表数据
    async getEmployeeList() {
      this.loading = true;
      // 结构数据
      const { total, rows } = await getEmployeeList(this.page);
      this.page.total = total;
      this.list = rows;
      this.loading = false;
      // console.log(this.list.length);
    },
    // 格式化页面数据
    formatEmployment(row, column, cellvalue, index) {
      const obj = Employees.hireType.find((emit) => emit.id === cellvalue);
      return obj ? obj.value : "未知";
    },
    // 删除员工
    async deleteEmployees(id) {
      this.loading = true;
      try {
        await this.$confirm("你确定要删除数据吗？");
        const result = await delEmployee(id);
        if (result.success) {
          this.$message.success("删除成功！");
          this.getEmployeeList();
        } else {
          this.$message.error("删除失败");
        }
      } catch (error) {
        // this.$confirm(error);
      }

      this.loading = false;
    },
  },
};
</script>

<style>
</style>