import request from '@/utils/axios';

//会员删除
export const memberDelete = (params, config) =>request.get('/console/member/delete', { params, ...config});

//会员编辑详情
export const memberEdit = (params, config) =>request.get('/console/member/edit', { params, ...config});

//会员列表
export const memberList = (params, config) =>request.get('/console/member/index', { params, ...config});

//会员信息保存
export const memberSave = (params, config) =>request.post('/console/member/save', params, {...config});

//更新公众号粉丝信息
export const memberUpdateFans = (params, config) =>request.get('/console/member/updateFans', { params, ...config});

//会员社交平台信息删除
export const memberSocialDelete = (params, config) =>request.get('/console/memberSocial/delete', { params, ...config});

//会员社交平台列表
export const memberSocialList = (params, config) =>request.get('/console/memberSocial/index', { params, ...config});

//会员社交平台信息保存
export const memberSocialSave = (params, config) =>request.post('/console/memberSocial/save', params, {...config});

//会员分组删除
export const memberGroupDelete = (params, config) =>request.get('/console/memberGroup/delete', { params, ...config});

//会员分组列表
export const memberGroupList = (params, config) =>request.get('/console/memberGroup/index', { params, ...config});

//会员分组保存
export const memberGroupSave = (params, config) =>request.post('/console/memberGroup/save', params, {...config});