var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var vConsolePlugin = require('vconsole-webpack-plugin');
var px2rem = require('postcss-px2rem');
var autoprefixer = require('autoprefixer');

var port = 8003;
var host = 'localhost';

module.exports = {
    port,
    host,
    entry: [
        'webpack/hot/dev-server',
        `webpack-dev-server/client?http://${host}:${port}`,
        path.resolve(__dirname,'app/main.js'),
        path.resolve(__dirname,'lib/flex.js')
    ],
    output: {
        path: path.join(__dirname,'build'),
        filename: '[name].js',
        chunkFilename: "[name].[chunkhash:5].chunk.js",
        publicPath: '',
    },
    devtools: 'inline-source-map',
    resolve: {
        extends: ['','.js'],
        alias:{
            app: path.resolve(__dirname, './app'),
        }
    },
    plugins: [
         //微信调试
        new vConsolePlugin({
          enable: true
        }),
        // 热替换 防止报错插件
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // new WebpackMd5Hash(),
        new webpack.optimize.DedupePlugin(),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: path.join(__dirname, 'app/main.html'),
          chunks: ['main'],
          inject: true
        })
    ],
    module:{
        loaders: [{
          test: /\.jsx?$/, // .js .jsx
          loader: 'react-hot',
          include: path.join(__dirname, 'app')
        }, {
          test: /\.jsx?$/, // .js .jsx
          loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
          include: path.join(__dirname, 'app'),
          query: {
            plugins: ['transform-decorators-legacy' ],
            presets: ['react', 'es2015', 'stage-0']
          }
        }, {
          test: /\.css$/,
          loader: 'style-loader!css-loader!postcss-loader?{browsers:["iOS >= 7","Android >= 4.0","last 2 Chrome versions","last 2 Safari versions"]}'
        }, {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!postcss-loader!sass-loader?{browsers:["iOS >= 7","Android >= 4.0","last 2 Chrome versions","last 2 Safari versions"]}'
        }, {
          test: /\.(png|jpg|gif|svg)$/,
          //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
          loader: 'url-loader?limit=2048&name=images/[hash:8].[name].[ext]'
        }]
    },
    postcss: function(){
        return [px2rem({ remUnit: 75 }),autoprefixer];
    }
};
