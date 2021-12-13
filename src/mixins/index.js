import encrypt from './methods/encrypt';

export default {
  mixins:[encrypt],
  install(Vue){
    Vue.RSAEncrypt = encrypt.methods.RSAEncrypt;
    Vue.prototype.RSAEncrypt = encrypt.methods.RSAEncrypt;
  }
}