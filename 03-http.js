//构建web服务器
//node提供的核心模块，创建编写服务器的
var http=require('http')
//1创建SERVER,http.createServer()返回一个服务器实例
var server=http.createServer()
//服务器提供对数据的服务
//接受请求
//处理请求
//发送响应

//2请求事件处理函数，接受两个参数request,reponse
server.on('request',function(request,response){
    //打印日志
    //根据不同请求路径显示不同请求内容
    //request.url获取得到的是端口号之后的那一部分路径所有请求以/开头
    if(request.url==='/haha'){
        // reponse.write('哈哈哈')多个write
        // reponse.end()//不说发完，浏览器一直转圈
    //响应只能是字符串和二进制   像对象，数组，数字，布尔值都不能
    //用json.parse转数组为对象，json.stringfy转对象为字符串
        response.end('hello world')
        
    }else if(request.url==='/kuaile'){
        response.write('快乐')
        response.end()
       
    }else if(request.url==='/'){
        response.write('我是默认的')
        response.end()
        
    }
    console.log("收到客户端请求3")
})
//3绑定端口号，启动服务器  80端口是浏览器默认去请求
server.listen(3000,function(){
    console.log('服务器启动成功')
})


