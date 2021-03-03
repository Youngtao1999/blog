// 接口文件
const baseUrl = "http://127.0.0.1:7001/front/";

const apiPath = {
  getArticleList: baseUrl+"getArticleList/", // 首页接口
  getArticleById: baseUrl+"getArticleById/", // 详情页接口
  getTypeInfo: baseUrl+"getTypeInfo/",  // 类型目录接口
  getListById: baseUrl+"getListById/", // 详情页接口
}

export default apiPath;