var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config')

var compiler = webpack(config);
var server = new webpackDevServer(compiler,{
  historyApiFallback: true,
  hot: true,
  inline: true,
  progress: true,
  contentBase: './app',
  stats: { colors: true }
})
console.log('%%%%%$$$$$$$$$$$$$$$$');
server.listen(config.port,"localhost",function(err){
    if(err){
        console.log(err);
    }

    console.log(`Listening at ${config.host}:${config.port}...`);
})
