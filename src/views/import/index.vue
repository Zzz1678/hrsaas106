<template>
  <upload-excel :on-success="onSuccess" />
</template>
<script>
import { importEmployee } from "@/api/employees";
export default {
  name: "importEmployee",
  data() {
    return {};
  },
  methods: {
    //   批量导入员工
    async onSuccess({ header, results }) {
      const userRelations = {
        入职日期: "timeOfEntry",
        手机号: "mobile",
        姓名: "username",
        转正日期: "correctionTime",
        工号: "workNumber",
      };
      const arr = [];
      results.forEach((item) => {
        var userInfo = {};
        Object.keys(item).forEach((key) => {
          if (
            userRelations[key] === "timeOfEntry" ||
            userRelations[key] === "correctionTime"
          ) {
            userInfo[userRelations[key]] = new Date(
              this.formatDate(item[key], "/")
            ); // 只有这样, 才能入库
            return;
          }

          userInfo[userRelations[key]] = item[key];
        });
        arr.push(userInfo);
      });
      await importEmployee(arr); //调用导入接口
      this.$message.success("导入成功");
      this.$router.back();
    },

    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1);
      time.setYear(time.getFullYear() - 70);
      const year = time.getFullYear() + "";
      const month = time.getMonth() + 1 + "";
      const date = time.getDate() - 1 + "";
      if (format && format.length === 1) {
        return year + format + month + format + date;
      }
      return (
        year +
        (month < 10 ? "0" + month : month) +
        (date < 10 ? "0" + date : date)
      );
    },
  },
};
</script>

<style>
</style>