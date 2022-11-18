---
layout: home
---
<script setup>
import isMobile from './utils/isMobile.ts';
import PagePc from './page/Email.vue';
import {onMounted} from 'vue';
onMounted(()=>{
    if (isMobile()  && window.innerWidth <= 768) {
        window.location.href = '/toemailh.html';
    }
});
</script>
<PagePc></PagePc>