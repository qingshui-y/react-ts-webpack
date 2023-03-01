const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: path.join(__dirname, "../src/index.tsx"),
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name]_[chunkhash:8].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [path.resolve(__dirname, "../src")],
        use: [
          {
            loader: "thread-loader",
            options: {
              workers: 3,
            },
          },
          "babel-loader",
        ],
      },
      {
        test: /.js$/,
        include: [path.resolve(__dirname, "../src")],
        use: [
          {
            loader: "thread-loader",
            options: {
              workers: 3,
            },
          },
          "babel-loader",
        ],
      },
      {
        test: /.css$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /.less$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              // 开启 CSS Modules
              modules: {
                // 借助 CSS Modules，可以很方便地自动生成 BEM 风格的命名
                localIdentName: "css__module__[name]__[local]",
              },
            },
          },
          "less-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset",
        parser: {
          //转base64的条件
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb
          },
        },
        generator: {
          filename: "static/images/[name]_[contenthash:6][ext]",
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/fonts/[name]_[contenthash:6][ext]", // 文件输出目录和命名
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/media/[name]_[contenthash:6][ext]", // 文件输出目录和命名
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src/index.html"),
      inject: true,
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
  cache: {
    // 将缓存类型设置为文件系统,默认是memory
    type: "filesystem",
    buildDependencies: {
      // 更改配置文件时，重新缓存
      config: [__filename],
    },
  },
  resolve: {
    modules: [path.resolve(__dirname, "../node_modules")],
    extensions: [".js", ".tsx", ".ts"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  stats: "errors-only",
};
