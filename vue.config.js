const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  // chainWebpack: config => {
  //   config.resolve.alias
  //     .set('@', resolve('src'))
  // }


  // chainWebpack: config => {
  //   /* ... */
  //   config.module
  //     .rule('worker')
  //     .test(/worker\.js$/)
  //     .use('worker-loader')
  //     .loader('worker-loader')
  //     .end()
  //   /* ... */
  // }
}