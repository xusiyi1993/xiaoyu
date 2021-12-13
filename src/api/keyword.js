import request from '@/utils/axios';

//关键字删除
export const keywordDelete = (params, config) =>request.get('/console/keyword/delete', { params, ...config});

//关键字编辑详情
export const keywordEdit = (params, config) =>request.get('/console/keyword/edit', { params, ...config});

//关键字列表
export const keywordList = (params, config) =>request.get('/console/keyword/index', { params, ...config});

//关键字保存
export const keywordSave = (params, config) =>request.post('/console/keyword/save', params, {...config});