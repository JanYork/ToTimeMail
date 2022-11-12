/*
 * @Author: JanYork 747945307@qq.com
 * @Date: 2022-10-17 09:27:32
 * @LastEditors: JanYork 747945307@qq.com
 * @LastEditTime: 2022-11-10 22:22:01
 * @FilePath: \CxyW\docs\.vitepress\config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { defineConfig } from "vitepress";

// export default {
//     themeConfig: {
//         siteTitle: "程序员中心",
//         // logo: "/logo.png",
//         nav: [
//             // { text: "指南", link: "/guild/installation" },
//             // { text: "组件", link: "/examples/button/" },
//         ],
//         socialLinks: [{ icon: "github", link: "https://github.com/ProgrammerCenter" }],
//     },
// }
export default defineConfig({
  lang: "zh-CN",
  title: "云寄•时光邮局",
  description: "",
  titleTemplate: "与时同行公益项目",
  themeConfig: {
    siteTitle: "云寄•时光邮局",
    footer: {
      message: `<a href="https://beian.miit.gov.cn/" target="_blank">湘ICP备2022020166号</a>`,
      copyright: `Copyright © 2022${
        new Date().getFullYear() !== 2022
          ? ` - ${new Date().getFullYear()}`
          : ""
      } 与时团队`,
    },
    // socialLinks: [
    //   { icon: "github", link: "https://github.com/ProgrammerCenter" },
    //   { icon: "discord", link: "https://discord.gg/fNVPtZZ9" },
    //   {
    //     icon: {
    //       svg:
    //         `<svg t="1666165607571" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2741" width="200" height="200"><path d="M385.20448 889.045333c-30.464 0-25.301333-11.562667-35.797333-40.490666l-89.728-295.253334L949.897813 143.786667" fill="" p-id="2742"></path><path d="M385.20448 889.045333c23.552 0 33.92-10.752 47.146667-23.594666l125.482666-121.898667-156.629333-94.464" fill="" p-id="2743"></path><path d="M401.20448 649.088l379.306667 280.234667c43.306667 23.893333 74.581333 11.562667 85.333333-40.192l154.453333-727.594667c15.872-63.445333-24.064-92.117333-65.450666-73.386667L48.009813 437.888c-61.866667 24.832-61.568 59.392-11.264 74.794667l232.746667 72.533333L808.11648 245.461333c25.386667-15.36 48.768-7.125333 29.610667 9.898667" fill="" p-id="2744"></path></svg>`
    //     }, link: "https://t.me/cxyzxtg"
    //   },
    // ],
    nav: [
      { text: "关于项目",link: "/concerning.html" },
      { text: "隐私政策",link: "/PrivacyPolicy.html" },
    ],
  },
  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    ["meta", { name: "keywords", content: "程序员中心,程序员中心官网,程序员中心门户,程序员社团,程序员,社团,中心" }],
  ],
  vite: {
    define: {
      __VUE_OPTIONS_API__: false,
    },
    optimizeDeps: {
      include: ["gsap", "dynamics.js"],
      exclude: ["@vue/repl"],
    },
    // @ts-ignore
    ssr: {
      external: ["@vue/repl"],
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ["../.."],
      },
    },
    build: {
      minify: "terser",
      chunkSizeWarningLimit: Infinity,
    },
    json: {
      stringify: true,
    },
  },

  vue: {
    reactivityTransform: true,
  },
});
