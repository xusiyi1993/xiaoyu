import request from '@/utils/axios';

//批量用户授权
export const userInfoAuthorization = (params, config) =>request.post('/system/userInfo/bindRole', params, {...config});

//用户删除
export const userInfoDelete = (params, config) =>request.get('/system/userInfo/delete', { params, ...config});

//用户编辑详情
export const userInfoEdit = (params, config) =>request.get('/system/userInfo/edit', { params, ...config});

//用户列表
export const userInfoList = (params, config) =>request.post('/system/userInfo/index', params, {...config});

//用户保存
export const userInfoSave = (params, config) =>request.get('/system/userInfo/save', { params, ...config});

//delete
export const userAuthoritionDelete = (params, config) =>request.get('/system/userAuthorition/delete', { params, ...config});

//edit
export const userAuthoritionEdit = (params, config) =>request.get('/system/userAuthorition/edit', { params, ...config});

//getUserAuthorities
export const getUserAuthorities = (params, config) =>request.get('/system/userAuthorition/getUserAuthorities', { params, ...config});

//index
export const userAuthoritionList = (params, config) =>request.get('/system/userAuthorition/index', { params, ...config});

//add
export const userAuthoritionSave = (params, config) =>request.post('/system/userAuthorition/save', params, {...config});

//角色删除
export const userRoleDelete = (params, config) =>request.get('/system/userRole/delete', { params, ...config});

//角色编辑详情
export const userRoleEdit = (params, config) =>request.get('/system/userRole/edit', { params, ...config});

//角色列表分页
export const userRolePage = (params, config) =>request.get('/system/userRole/index', { params, ...config});

//角色保存
export const userRoleSave = (params, config) =>request.post('/system/userRole/save', params, {...config});