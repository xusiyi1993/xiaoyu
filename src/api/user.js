import request from '@/utils/axios';

//登陆接口
export const login = (params, config) =>request.post('/auth/user/login', params, {...config});
