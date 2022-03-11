<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共166条记录</span>
        <template slot="after">
          <el-button
            size="small"
            type="success"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="daoChu">导出</el-button>
          <el-button size="small" type="primary" @click="showDialog = true"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="list">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="头像" align="center">
            <template v-slot="{ row }">
              <img
                :src="row.staffPhoto"
                style="
                  border-radius: 50%;
                  width: 100px;
                  hight: 100px;
                  padding: 10px;
                "
                v-imgerror="require('@/assets/common/head.jpg')"
                @click="showQrDialog(row.staffPhoto)"
              />
            </template>
          </el-table-column>
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
              <el-button
                type="text"
                size="small"
                @click="$router.push(`/employees/detail/${row.id}`)"
                >查看</el-button
              >
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
      <!-- 放置弹层 -->
      <add-employee :showDialog.sync="showDialog"> </add-employee>
      <el-dialog title="二维码" :visible.sync="showCodeDialog">
        <el-row type="flex" justify="center">
          <canvas ref="myCanvas"></canvas>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from "@/api/employees";
import Employees from "@/api/constant/employees";
import addEmployee from "./components/add-employee.vue";
import { formatDate } from "@/filters";
import QrCode from "qrcode";
export default {
  components: { addEmployee },
  data() {
    return {
      showCodeDialog: false,
      showDialog: false,
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
        this.$message.success("删除成功！");
        this.getEmployeeList();
      } catch (error) {
        this.$message.error(error);
      }

      this.loading = false;
    },
    // 获取data的函数
    formatJson(headers, rows) {
      // return rows.map((item) =>
      //   Object.keys(headers).map((key) => item[headers[key]])
      // );

      return rows.map((item) => {
        return Object.keys(headers).map((key) => {
          if (
            headers[key] === "timeOfEntry" ||
            headers[key] === "correctionTime"
          ) {
            return formatDate(item[headers[key]]);
          } else if (headers[key] === "formOfEmployment") {
            const obj = Employees.hireType.find(
              (obj) => obj.id === item[headers[key]]
            );
            return obj ? obj.value : "未知";
          }
          return item[headers[key]];
        });
      });
    },
    // 导出员工
    daoChu() {
      const headers = {
        姓名: "username",
        手机号: "mobile",
        入职日期: "timeOfEntry",
        聘用形式: "formOfEmployment",
        转正日期: "correctionTime",
        工号: "workNumber",
        部门: "departmentName",
      };
      import("@/vendor/Export2Excel").then(async (excel) => {
        const { rows } = await getEmployeeList({
          //注意：这里不要用this.老调用getEmployeeList
          // 局部的可以直接调用整体的，整体的
          page: 1,
          size: this.page.total,
        });
        console.log(rows);
        const data = this.formatJson(headers, rows);
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: "员工信息表", //非必填
          autoWidth: true, //非必填
          bookType: "xlsx", //非必填
          mulitHeader: [["姓名", "主要信息", "部门"]],
          merges: ["A1:A2", "B1:F1", "G1:G2"],
        });
      });
    },

    showQrDialog(url) {
      if (url) {
        this.showCodeDialog = true;
        // 数据更新了 但是我的弹层会立刻出现吗 ？页面的渲染是异步的！！！！
        // 有一个方法可以在上一次数据更新完毕，页面渲染完毕之后
        this.$nextTick(() => {
          // 此时可以确认已经有ref对象了
          QrCode.toCanvas(this.$refs.myCanvas, url); // 将地址转化成二维码
          // 如果转化的二维码后面信息 是一个地址的话 就会跳转到该地址 如果不是地址就会显示内容
        });
      } else {
        this.$message("用户还未上传图片");
      }
    },
  },
};
</script>

<style>
</style>