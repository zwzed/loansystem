const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://159.75.169.224:6300/',
          changeOrigin: true,
          pathRewrite: { '^/api': '' }
        }
      }
    }
  }
})
