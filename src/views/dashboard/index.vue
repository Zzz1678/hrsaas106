<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>

    <page-tools :showBefore="true">
      <span slot="before">少时诵诗书</span>
      <el-button slot="after" type="primary">导入excel表格</el-button>
    </page-tools>
    <UploadExcel />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UploadExcel from "@/components/UploadExcel";
export default {
  name: "Dashboard",
  components: {
    UploadExcel,
  },
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
