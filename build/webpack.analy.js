const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const { merge } = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const prodConfig = require("./webpack.prod.js");

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap(
  merge(prodConfig, {
    plugins: [
      // 分析webpack构建结果文件
      new BundleAnalyzerPlugin(),
    ],
  })
);
