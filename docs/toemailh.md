---
layout: home
---
<script setup>
import isMobile from './utils/isMobile.ts';
import PageMobile from './page/EmailMobile.vue';
import {onMounted} from 'vue';
onMounted(()=>{
    if (!isMobile()  && window.innerWidth > 768) {
        window.location.href = '/toemail.html';
    }
});
</script>
<PageMobile></PageMobile>