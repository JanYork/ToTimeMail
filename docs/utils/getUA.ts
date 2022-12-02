function getUA(){
    let u = navigator.userAgent;
    let ua = navigator.userAgent.toLocaleLowerCase();
    return {
        trident: u.indexOf('Trident') > -1,                        /*IE内核*/

        presto: u.indexOf('Presto') > -1,          /*opera内核*/

        webKit: u.indexOf('AppleWebKit') > -1, /*苹果、谷歌内核*/

        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,        /*火狐内核*/

        mobile: !!u.match(/AppleWebKit.*Mobile.*/),        /*是否为移动终端*/

        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), /*ios终端*/

        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, /*android终端或者uc浏览器*/

        iPhone: u.indexOf('iPhone') > -1,          /*是否为iPhone或者QQHD浏览器*/

        iPad: u.indexOf('iPad') > -1,      /*是否iPad*/

        webApp: u.indexOf('Safari') == -1,          /*是否web应该程序，没有头部与底部*/

        souyue: u.indexOf('souyue') > -1,

        superapp: u.indexOf('superapp') > -1,

        weixin:u.toLowerCase().indexOf('micromessenger') > -1,

        //@ts-ignore
        qq: ua.match(/QQ/i) == "qq", // QQ
        //@ts-ignore
        weiBo: ua.match(/WeiBo/i) == "weibo", // 微博

        Safari:u.indexOf('Safari') > -1,

        QQbrw: u.indexOf('mqqbrowser') > -1, // QQ浏览器

        webview: !(u.match(/Chrome\/([\d.]+)/) || u.match(/CriOS\/([\d.]+)/)) && u.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),

        ucweb: function () {
            try {
                return parseFloat(u.match(/ucweb\d+\.\d+/gi).toString().match(/\d+\.\d+/).toString()) >= 8.2
            } catch (e) {
                return u.indexOf('UC') > -1;
            }
        }(),

        Symbian: u.indexOf('Symbian') > -1,
        ucSB: u.indexOf('Firofox/1.') > -1
    };
}
export default getUA;