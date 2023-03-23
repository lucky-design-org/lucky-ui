const path = require('path')

//提取CSS文件的
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//当前命令所在的目录
const cwd = process.cwd()

module.exports = {
  mode: 'development', //开发模式
  devtool: false, //关闭生成sourcemap
  entry: {
    antd: './index.js'
  },
  output: {
    path: path.resolve('dist'), //输出到dist目录
    filename: '[name].js', //打包后的文件 antd.css
    library: 'lucky-ui', //打包后库的名字
    libraryTarget: 'umd' //打包后模块的格式 umd amd cmd commonjs commonjs window
  },
  externals: {
    //组件库代码其实是不需要打包react 和react-dom进去的
    react: {
      //外部依赖
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  },

  resolve: {
    // 指定扩展名
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },

  module: {
    rules: [
      {
        // 把这些CSS收集起来后面通过插件写入单独的antd.css
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          // 把这些CSS收集起来后面通过插件写入单独的antd.css
          MiniCssExtractPlugin.loader,
          // 处理@import和url
          {
            loader: 'css-loader', 
            options: {
              sourceMap: true
            }
          },
          // 前缀
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer']
              },
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer']
              },
              sourceMap: true
            }
          },
          //把less编译 成css
          {
            loader: 'less-loader', 
            options: {
              lessOptions: {
                javascriptEnabled: true
              },
              sourceMap: true
            }
          }
        ]
      },
      {
        //webpack5里file-loader url-loader已经废弃 了
        test: /\.(png|jpg|jpeg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset' //静态文件不再需要配置loader
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
}
