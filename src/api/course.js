import request from '@/utils/axios';

//课程删除
export const courseDelete = (params, config) =>request.get('/console/course/delete', { params, ...config});

//课程编辑详情
export const courseEdit = (params, config) =>request.get('/console/course/edit', { params, ...config});

//课程列表分页
export const courseList = (params, config) =>request.get('/console/course/index', { params, ...config});

//课程保存
export const courseSave = (params, config) =>request.post('/console/course/save', params, {...config});

//课程上下架
export const courseShelves = (params, config) =>request.get('/console/course/shelves', { params, ...config});

//出版社删除
export const coursePublisherDelete = (params, config) =>request.get('/console/coursePublisher/delete', { params, ...config});

//出版社编辑详情
export const coursePublisherEdit = (params, config) =>request.get('/console/coursePublisher/edit', { params, ...config});

//出版社列表分页
export const coursePublisherList = (params, config) =>request.get('/console/coursePublisher/index', { params, ...config});

//出版社保存
export const coursePublisherSave = (params, config) =>request.post('/console/coursePublisher/save', params, {...config});

//分类删除
export const categoryDelete = (params, config) =>request.get('/console/category/delete', { params, ...config});

//分类数据分页
export const categoryPage = (params, config) =>request.get('/console/category/index', { params, ...config});

//分类保存
export const categorySave = (params, config) =>request.post('/console/category/save', params, {...config});

//上架或下架
export const categoryShelves = (params, config) =>request.get('/console/category/shelves', { params, ...config});