import JSEncrypt from 'jsencrypt';

export default {

  methods: {
    // RSA加密
    RSAEncrypt(content) {
      const publicKey =
      '-----BEGIN PUBLIC KEY-----' +
      'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCGp2dLBvlbFm8Dk+TwfYb9SPHD' +
      'McI+zVgDlyt1F1ym0QtwYEeTX6o7R9fDsoYfSjQpVS/7MLVru9SJdUZZ8MYy8YlF' +
      'MS15tguRA5sar+G4v6oFB8iCLUB7ybIE6e91asxSTaHKttUrelVVjfhgAylxJ8re' +
      'L/Shn6lEjZHMVOmJlQIDAQAB' +
      '-----END PUBLIC KEY-----';

      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(publicKey);
      return encrypt.encrypt(content);
    },
  },
};
