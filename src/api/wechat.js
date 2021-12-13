import request from '@/utils/axios';

//公众号消息推送
export const messagePush = (params, config) =>request.post('/open/weixin/message/{appid}', params, {...config});

//消息删除
export const weixinReplyDelete = (params, config) =>request.get('/console/weixinReply/delete', { params, ...config});

//微信消息列表
export const weixinReplyList = (params, config) =>request.get('/console/weixinReply/index', { params, ...config});

//消息保存
export const weixinReplySave = (params, config) =>request.post('/console/weixinReply/save', params, {...config});

//消息开关读取
export const weixinReplySwitchEdit = (params, config) =>request.get('/console/weixinReply/switchEdit', { params, ...config});

//消息开关设置
export const weixinReplySwitchSave = (params, config) =>request.get('/console/weixinReply/switchSave', { params, ...config});

//关键字消息删除
export const keywordDelete = (params, config) =>request.get('/console/weixinReply/delete?toType=keyword', { params, ...config});

//微信关键字消息列表
export const keywordList = (params, config) =>request.get('/console/weixinReply/index?toType=keyword', { params, ...config});

//微信消息列表
export const weixinMessageList = (params, config) =>request.get('/console/weixinReply/index?toType=message', { params, ...config});

//关键字消息保存
export const keywordSave = (params, config) =>request.post('/console/weixinReply/save?toType=keyword', params, {...config});

//微信素材删除
export const  weixinMaterialDelete = (params, config) =>request.get('/console/weixinMaterial/delete', { params, ...config});

//微信素材文件获取
export const weixinMaterialGetFile = (params, config) =>request.get('/console/weixinMaterial/getFile', { params, ...config});

//微信素材列表
export const weixinMaterialList = (params, config) =>request.get('/console/weixinMaterial/index', { params, ...config});

//素材图文素材更新
export const weixinMaterialUpdateNews = (params, config) =>request.post('/console/weixinMaterial/updateNews', params, {...config});

//微信素材文件上传
export const weixinMaterialUploadFile = (params, config) =>request.post('/console/weixinMaterial/uploadFile', params, {...config});

//微信图文素材上传
export const weixinMaterialUploadNews = (params, config) =>request.post('/console/weixinMaterial/uploadNews', params, {...config});

//微信菜单列表
export const GetWeixinMenu = (params, config) =>request.get('/console/weixinMenu/index', { params, ...config});

//微信菜单保存
export const weixinMenuSave = (params, config) =>request.post('/console/weixinMenu/save', params, {...config});