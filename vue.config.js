// 数据库接口地址
const DatabaseURL = 'http://localhost:3000';

module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: DatabaseURL,
        changeOrigin: true
      },
      '/upload': {
        target: DatabaseURL
      }
    }
  }
}
