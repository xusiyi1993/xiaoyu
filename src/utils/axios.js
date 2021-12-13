import axios from 'axios'

const instance = axios.create({

  baseURL: "/api",

  timeout: 10000,
})

instance.interceptors.request.use((request) => {
  request.headers.common['version'] = '1.0.0';
  request.headers.common['X-Auth-Token'] = JSON.parse(window.localStorage.getItem("token") || '""'
  );
  request.withCredentials = true;
  return request;
});

instance.interceptors.response.use((response) => {
  if (response.status == 200) {
    if([1000,1001,1002].some(val=>val===response.data.code)){
      instance.Message.error({
        type: 'error',
        Message: response.data.message,
      });
      setTimeout(()=>{
        window.location.href = '/auth/user/login'
      },2000);
    }else{
      return Promise.resolve(response.data);
    }
    return Promise.reject();
  }
},(error)=>{
  instance.Message.error('系统繁忙，请稍后再试！');
  Promise.reject(error);
});

export default instance
