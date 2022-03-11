<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :file-list="fileList"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :http-request="upload"
      :class="{ disabled: fileComputed }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress
      v-if="showPrecent"
      style="width: 180px"
      :percentage="percent"
    />
    <el-dialog title="图片预览" :visible.sync="showDialog">
      <img :src="imgUrl" style="width: 100%" alt="" />
    </el-dialog>
  </div>
</template>

<script>
// 配置腾讯云cos
import COS from "cos-js-sdk-v5";
const cos = new COS({
  SecretId: "",
  SecretKey: "",
});
export default {
  name: "ImageUpload",
  data() {
    return {
      showPrecent: false,
      percent: 0,
      fileList: [], // 图片地址设置为数组
      showDialog: false, // 控制显示弹层
      imgUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      currentFileUid: null,
    };
  },

  computed: {
    // 设定一个计算属性 判断是否已经上传完了一张
    fileComputed() {
      return this.fileList.length === 1;
    },
  },

  methods: {
    // 预览
    preview(file) {
      //   console.log(file);
      this.imgUrl = file.url;
      this.showDialog = true;
    },

    // 删除
    handleRemove(file) {
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid);
    },
    // 添加
    changeFile(file, fileList) {
      this.fileList = fileList.map((item) => item);
      console.log(this.fileList);
    },
    //添加前校验
    beforeUpload(file) {
      // 判断文件格式是否符合条件
      const types = ["image/jpeg", "image/gif", "image/bmp", "image/png"];

      if (!types.some((item) => item === file.type)) {
        // 如果不存在则
        this.$message.error("你上传的图片格式不正确！");
        return false;
      }

      // 检查文件大小  5M 1M = 1024KB 1KB = 1024B
      const MaxSize = 5 * 1024 * 1024;

      if (file.size > MaxSize) {
        this.$message.error("上传文件内存过大");
        return false;
      }

      this.currentFileUid = file.uid;
      this.showPrecent = true;
      // 确定上传
      return true;
    },
    // 上传
    upload(params) {
      // console.log(params.file);
      if (params.file) {
        // 配置腾讯云cos
        cos.putObject(
          {
            Bucket: "redoctober-1310064734", // 存储桶
            Region: "ap-beijing", // 地域
            Key: params.file.name, // 文件名
            Body: params.file, // 要上传的文件对象
            StorageClass: "STANDARD", // 上传的模式类型 直接默认 标准模式即可
            // 上传到腾讯云 =》 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
            onProgress: (params) => {
              // console.log(params);
              this.percent = params.percent * 100;
            },
          },
          // function (err, data) {
          //   console.log(err || data);
          // }
          (err, data) => {
            // data返回数据之后 应该如何处理
            // console.log(err || data);
            if (!err && data.statusCode === 200) {
              this.fileList = this.fileList.map((item) => {
                if (this.currentFileUid === item.uid) {
                  return { url: "http://" + data.Location, upload: true };
                }
                return item;
              });
              // 将上传成功的地址 回写到了fileList中 fileList变化  =》 upload组件 就会根据fileList的变化而去渲染视图
              setTimeout(() => {
                this.showPrecent = false;
                this.percent = 0;
              }, 3000);
            }
          }
        );
      }
    },
  },
};
</script>

<style >
.disabled .el-upload--picture-card {
  display: none;
}
</style>
