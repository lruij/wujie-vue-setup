const { Configuration } = require('webpack')
const path = require('path')

/**
 * @type {Configuration} //配置智能提示
 */
const config = {
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    clean: true,
    path: path.resolve(__dirname, './lib'),
    library: "WujieVue",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  externals: {
    vue: 'vue',
    wujie: "wujie"
  },
  mode: "none",
  cache: true,
  module: {
    rules: [
      {
        test: /\.ts$/,  //解析ts
        loader: "swc-loader", //使用新技术swc-loader
      }
    ]
  },

}

module.exports = config
