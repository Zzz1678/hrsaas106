<template>
  <!-- 放置一个图标 -->
  <div>
    <!-- 放置一个svg的图标 -->
    <svg-icon
      icon-class="fullscreen"
      style="color: #fff; width: 20px; height: 20px"
      @click="changeScreen"
    />
  </div>
</template>

<script>
import ScreenFull from "screenfull"; //版本@5.0.2
export default {
  methods: {
    changeScreen() {
      // js的方式
      // esc退出
      //  document.documentElement.requestFullscreen()
      if (!ScreenFull.isEnabled) {
        //   如果不可用  就提示 并且返回
        this.$message.warning("当前全局组件不可用");
        return;
      }
      //  document.documentElement.requestFullscreen()   document.exitFullscreen 退出
      ScreenFull.toggle(); // 执行全屏 展开 关闭
    },
  },
};
</script>

<style>
</style>