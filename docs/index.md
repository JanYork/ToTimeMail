---
layout: home

hero:
  name: 云寄 • 时光邮局
  text: 一个有意义的公益项目
  tagline: A special group...
  image:
    src: /logo.png
    alt: 云寄 • 邮局
  actions:
    - theme: brand
      text: 📫 电脑写信
      link: /toemail
    - theme: brand
      text: 📱 手机写信
      link: /toemailh
    - theme: alt
      text: 📄 关于我们
      link: /concerning
features:
  - icon: ⚡️
    title: 多方式
    details: 支持真实邮寄、电子邮箱等等...
  - icon: 🖖
    title: 有价值
    details: 信件电子存档、实体信件、精致信纸、笔迹清秀...
  - icon: 🛠️
    title: 可联系
    details: 有任何问题都可以联系我们，不高冷、好说话...
---

<script setup>
import 'animate.css'
</script>
<style type="text/css"> 
.VPHome .VPFeatures {
    animation-duration: 2s;
    animation-fill-mode: both;
    animation-name: slideInUp;
}
.name,.text{
    animation-duration: 1.5s;
    animation-fill-mode: both;
    animation-name: flipInX;
}
.tagline{
    animation-duration: 2s;
    animation-fill-mode: both;
    animation-name: fadeInTopLeft;
}

.actions{
    animation-duration: 2s;
    animation-fill-mode: both;
    animation-name: lightSpeedInLeft;
}
.image{
    animation-duration: 3s;
    animation-fill-mode: both;
    animation-name: fadeInRight;
}
@media screen and (max-width: 768px) {
    .image{
        animation-name: fadeIn !important;
    }
    .tagline{
        animation-duration: 2s;
        animation-name: bounceIn !important;
    }
    .actions{
        animation-duration: 1s;
        animation-name: flipInX !important;
    }
}

.title{
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-name: wobble;
}
</style>