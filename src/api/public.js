import request from '@/utils/axios';

//统计新增关注
export const getNewFocus = (params, config) =>request.get('/auth/session/dateAttentionn', { params, ...config});

//统计新增收藏
export const getNewCollection = (params, config) =>request.get('/auth/session/dateCollect', { params, ...config});

//统计新增用户
export const getNewUser = (params, config) =>request.get('/auth/session/dateMember', { params, ...config});

//获取枚举数据
export const getEnums = (params, config) =>request.get('/auth/session/enums', { params, ...config});

//获取权限菜单集
export const getAuthoritiesMenu = (params, config) =>request.get('/auth/session/getAuthoritiesMenu', { params, ...config});

//获取用户信息
export const getUserInfo = (params, config) =>request.get('/auth/session/getUserInfo', { params, ...config});

//退出登录
export const loginOut = (params, config) =>request.get('/auth/session/loginout', { params, ...config});

//刷新token
export const refreshToken = (params, config) =>request.get('/auth/session/refreshToken', { params, ...config});

//修改密码
export const changePassword = (params, config) =>request.post('/auth/session/update-password', params, {...config});

//图片上传
export const uploadeImage = (params, config) =>request.post('/auth/uploader/image', params, {...config});

//图片上传阿里云
export const uploadeImageOss = (params, config) =>request.post('/auth/uploader/imageOss', params, {...config});
