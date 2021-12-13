import request from '@/utils/axios';

//广告删除
export const advDelete = (params, config) =>request.get('/market/advert/delete', { params, ...config});

//广告编辑详情
export const advEdit = (params, config) =>request.get('/market/advert/edit', { params, ...config});

//广告列表
export const advList = (params, config) =>request.get('/market/advert/index', { params, ...config});

//广告保存
export const advSave = (params, config) =>request.post('/market/advert/save', params, {...config});

//广告组删除
export const advGroupDelete = (params, config) =>request.get('/market/advertGroup/delete', { params, ...config});

//广告组编辑详情
export const advGroupEdit = (params, config) =>request.get('/market/advertGroup/edit', { params, ...config});

//广告组分页
export const advGroupPaging = (params, config) =>request.get('/market/advertGroup/index', { params, ...config});

//广告组保存
export const advGroupSave = (params, config) =>request.post('/market/advertGroup/save', params, {...config});