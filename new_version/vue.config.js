let proxyObj={}

proxyObj['/']={
  //websocket
  ws:false,
  //请求代理地址
  target:'http://localhost:8081',
  //发送请求头host会被设置target
  changeOrigin:true,

  pathReWrite:{
    '^/':'/'
  }
}
module.exports={
  devServer:{
    host:'localhost',
    port:8080,
    proxy:proxyObj
  }
}
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave:false
})