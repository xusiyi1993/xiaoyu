import request from '@/utils/axios';

//网站配置删除
export const keywordDelete = (params, config) =>request.get('/system/setting/delete', { params, ...config});

//网站配置列表
export const keywordEdit = (params, config) =>request.get('/system/setting/index', { params, ...config});

//网站配置保存
export const keywordList = (params, config) =>request.post('/system/setting/save', params, {...config});

//网站配置分组删除
export const settingGroupDelete = (params, config) =>request.get('/system/settingGroup/delete', { params, ...config});

//网站配置分组列表分页
export const settingGroupPage = (params, config) =>request.get('/system/settingGroup/index', { params, ...config});

//网站配置分组列表
export const settingGroupList = (params, config) =>request.get('/system/settingGroup/list', { params, ...config});

//网站配置分组保存
export const settingGroupSave = (params, config) =>request.post('/system/settingGroup/save', params, {...config});

//百度编辑器配置
export const configuration = (params, config) =>request.post('/session/ueditor/upload', params, {...config});