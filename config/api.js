// 接口文件
// dev
const baseUrl = "http://127.0.0.1:7001/front/";
// prod
// const baseUrl = "http://121.40.156.126:7001/front/";

const apiPath = {
  getArticleList: baseUrl+"getArticleList/", // 首页接口
  getArticleById: baseUrl+"getArticleById/", // 详情页接口
  getTypeInfo: baseUrl+"getTypeInfo/",  // 类型目录接口
  getLogoAvatar: baseUrl+"getLogoAvatar/",  // 类型头部和头像信息
  getListById: baseUrl+"getListById/", // 文章列表接口
  addComment: baseUrl+"addComment/", // 提交评论
  addReply: baseUrl+"addReply/", // 提交回复
  getCommentsById: baseUrl+"getCommentsById/", // 获取评论
  addCommentLikes: baseUrl+"addCommentLikes/", // 评论点赞
  addReplyLikes: baseUrl+"addReplyLikes/", // 回复点赞
  addViewCount: baseUrl+"addViewCount/", // 浏览量
}

export default apiPath;