const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/wp-json/api': {
        target: process.env.VUE_APP_WP_SITE_URL,
      }
    }
  }
})
