module.exports = {
  devServer: {
    proxy: {
      // 配置跨域
      '/api': {
        target: 'https://admin-test.xiaoyuxiazai.com/api',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
}
