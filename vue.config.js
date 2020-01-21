"use strict";
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

module.exports = {
  publicPath: "./",
  //   反向代理
  devServer: {
    host: "localhost", // can be overwritten by process.env.HOST
    port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    proxy: {
      "/api": {
        //使用"/api"来代替"http://f.apiplus.c"
        target: "http://tingapi.ting.baidu.com", //源地址
        changeOrigin: true, //改变源
        pathRewrite: {
          "^/api": "" //路径重写
        }
      }
    }
  }
};
