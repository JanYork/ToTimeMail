<template>
  <div id="vditor">

  </div>
</template>

<script setup>
import { onMounted, ref} from "vue";
import Vditor from "vditor";
import "vditor/dist/index.css";
import ToTimeConfig from "../config/ToTime.config";
import Notify from "vant/es/notify/index";

let vditor;
let editor;
onMounted(() => {
  vditor = ref(
      editor = new Vditor("vditor", {
        height: "100%",
        toolbar: [
          "emoji",
          "headings",
          "bold",
          "italic",
          "strike",
          "link",
          "upload",
        ],
        upload: {
          accept: 'image/*',
          // token: this.token,
          url: ToTimeConfig.uploadURL,
          linkToImgUrl: ToTimeConfig.linkURL,
          filename(byte) {
            return byte.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5.)]/g, '').replace(/[?\\/:|<>*\[\]()$%{}@~]/g, '').replace('/\\s/g', '')
          },
          fieldName: 'file',
          multiple: false,
          // 文件最大上传byte
          max: 1024 * 1024 * 5,
          success(_, msg) {
            let info = JSON.parse(msg);
            if (info.code === 200) {
              //编辑器回显
              editor.insertValue(`![](${info.imgUrl})`)
            } else {
              Notify({ type: 'warning', message: '图片上传失败' });
              return false;
            }
          }
        },
      })
  );
});
</script>