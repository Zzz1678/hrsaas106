<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :file-list="fileList"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog title="图片预览" :visible.sync="showDialog">
      <img :src="imgUrl" style="width: 100%" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        {
          url: "https://img1.baidu.com/it/u=1376324071,162125697&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
        },
      ], // 图片地址设置为数组
      showDialog: false, // 控制显示弹层
      imgUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    preview(file) {
      //   console.log(file);
      this.imgUrl = file.url;
      this.showDialog = true;
    },
  },
};
</script>

<style>
</style>