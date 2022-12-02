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
  title: "时光邮局",
  description: "云寄-时光邮局时与时同行旗下的产品，是一个专注于时光邮件的产品，支持给未来的自己发送电子邮件或者实体信件，致力于打造一个懂得记录的时光邮件服务，多关注生活点滴。",
  titleTemplate: "给未来的你或者她写一封跨越时空的书信",
  themeConfig: {
    siteTitle: "云寄•时光邮局",
    footer: {
      message: `<a href="https://beian.miit.gov.cn/" target="_blank">鄂ICP备2022012450-2号</a>`,
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
      // { text: "SitemapBaidu",link: "https://mail.totime.cn/map/sitemap_baidu.xml" },
      // { text: "Sitemap",link: "https://mail.totime.cn/map/sitemap.xml" },
      // { text: "RSS",link: "https://mail.totime.cn/map/sitemap.rss" },

      // { text: "官方站点",link: "https://mail.totime.cn" },
      { text: "关于项目",link: "https://mail.totime.cn/concerning.html" },
      { text: "隐私政策",link: "https://mail.totime.cn/PrivacyPolicy.html" },
    ],
  },

  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    ["meta", { name: "keywords", content: "时光邮局,与时同行,时光邮局,云寄,云寄时光邮局,时光信件,时光胶囊" }],
    ["link", { rel: "stylesheet", href: "https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/vant/4.0.0-alpha.0/index.min.css" }],
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
