const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const baseConfig = require("./webpack.base");

const PATHS = {
  src: path.join(__dirname, "../src"),
};

module.exports = merge(baseConfig, {
  mode: "production",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
    // purgecss-webpack-plugin遇到css-module基本已失效，后续再找下解决方法
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: {
        deep: [/css__module__/],
      },
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /(react|react-dom)/,
          name: "vendors",
          chunks: "all",
        },
        commons: {
          // 提取页面公共代码
          name: "commons", // 提取文件命名为commons
          minChunks: 2, // 只要使用两次就提取出来
          chunks: "initial", // 只提取初始化就能获取到的模块，不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
        },
      },
    },
  },
});
