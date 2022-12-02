---
layout: home
---
<script setup>
import isMobile from './utils/isMobile.ts';
import PageMobile from './page/EmailMobile.vue';
import {onMounted} from 'vue';
// onMounted(()=>{
//     if (!isMobile()  && window.innerWidth > 768) {
//         window.location.href = '/toemail.html';
//     }
// });
</script>
<PageMobile></PageMobile>
<style type="text/css" scoped>
/*移动端编辑器vditor样式覆盖*/
.vditor-toolbar{
  position: fixed !important;
  left: 0 !important;
  right: 0 !important;
  margin: 0 auto !important;
  width: 100% !important;
  background-color: transparent !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-around !important;
  padding: 0 !important;
}
.vditor-reset{
  margin-top: 36px !important;
}
</style>