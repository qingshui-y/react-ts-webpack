const webpack = require("webpack");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");

module.exports = merge(baseConfig, {
  mode: "development",
  devServer: {
    port: 3000, // 服务端口号
    compress: false, // gzip压缩，开发环境不开启，提升速度
    // 解决路由跳转404问题
    historyApiFallback: true,
    hot: true,
    // static: {
    //   //托管静态资源文件
    //   directory: path.join(__dirname, "../public"),
    // },
  },
  devtool: "eval-cheap-module-source-map",
  plugins: [
    // 开启react模块热替换插件
    new webpack.HotModuleReplacementPlugin(),
  ],
});
