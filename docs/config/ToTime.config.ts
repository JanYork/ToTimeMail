// 创建一个类保存配置信息
class ToTimeConfig {
        // 基础url前缀
        // static baseURL = "http://localhost:8899";
        static baseURL = "https://api.totime.cn";
        // 基础文件上传api
        // static uploadURL = "http://localhost:8899/upload/file";
        static uploadURL = "https://api.totime.cn/upload/file";
        // 基础链接上传api
        // static linkURL = "http://localhost:8899/upload/fileUrl";
        static linkURL = "https://api.totime.cn/upload/fileUrl";
        //是否镜像站点
        static isCopy = false;
        //官方站点
        static official = "https://mail.totime.cn";
}
// 导出配置
export default ToTimeConfig