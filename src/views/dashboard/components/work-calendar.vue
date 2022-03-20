<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select
        v-model="currentYear"
        size="small"
        style="width: 120px"
        @change="dateChange"
      >
        <el-option
          v-for="(item, index) in yearList"
          :key="index"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select
        v-model="currentMonth"
        size="small"
        style="width: 120px"
        @change="dateChange"
      >
        <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
      </el-select>
    </el-row>

    <el-calendar v-model="currentDate">
      <template slot="dateCell" slot-scope="{ date, data }" class="content">
        <div class="date-content">
          <span class="text"> {{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    getDay(value) {
      const day = value.split("-")[2];
      return day.startsWith("0") ? day.substr(1) : day;
    },
  },
  props: {
    startDate: {
      type: Date,
      default: () => new Date(),
    },
  },
  data() {
    return {
      currentMonth: null, // 当前月份
      currentYear: null, // 当前年份
      currentDate: null,
      yearList: [],
    };
  },
  created() {
    this.currentYear = this.startDate.getFullYear();
    this.currentMonth = this.startDate.getMonth() + 1;
    // console.log(this.currentYear, this.currentMonth);
    this.yearList = Array.from(Array(11), (v, i) => i + this.currentYear - 5);
    // console.log(this.yearList);
    // 计算 当年当月的第一个周一 再加上 四周之后的一个月月份
    this.dateChange();
  },
  methods: {
    // 是否是休息日
    isWeek(value) {
      return value.getDay() === 6 || value.getDay() === 0;
    },
    dateChange() {
      const year = this.currentYear;
      const month = this.currentMonth;
      this.currentDate = new Date(`${year}-${month}-1`);
      console.log(this.currentDate);
    },
  },
};
</script>

<style scoped>
.el-calendar-day {
  height: auto;
}
.el-calendar-table__row td,
.el-calendar-table tr td:first-child,
.el-calendar-table__row td.prev {
  border: none;
}
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text {
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
}
.el-calendar-table td.is-selected .text {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}
.el-calendar__header {
  display: none;
}
</style>

