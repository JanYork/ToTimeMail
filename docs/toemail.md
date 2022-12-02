---
layout: home
---
<script setup>
import isMobile from './utils/isMobile.ts';
import PagePc from './page/Email.vue';
import {onMounted} from 'vue';
// onMounted(()=>{
//     if (isMobile()  && window.innerWidth <= 768) {
//         window.location.href = '/toemailh.html';
//     }
// });
</script>
<PagePc></PagePc>
<style type="text/css" scoped>
/* 全局美化滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  width: 6px;
  background: rgba(#101F1C, 0.1);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(144, 147, 153, .5);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  transition: background-color .3s;
  cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144, 147, 153, .3);
}
</style>