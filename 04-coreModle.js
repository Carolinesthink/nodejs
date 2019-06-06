//require是一个方法，加载执行文件中的代码
//require方法的两个作用：
//1加载执行文件中的代码
//2拿到被加载文件模块的接口对象
//node中没有全局作用域，只有模块作用域，也就是文件作用域,外部访问不到内部，内部访问不到外部
//相对路径./ 或者../不能省略，会当成具名核心模块，后缀名可以省略
//既然是模块作用域，如何进行模块与模块之间的通信，
//每个文件模块都提供了一个对象export，默认是{},export.foo,动态添加属性和方法
//所有联网的程序都要进行网络通信，计算机中只有一个物理网卡，同一个局域网网卡地址唯一的，
var http=require('http')
var fs=require('fs')

var server=http.createServer()
server.on('request',function(req,res){
   
    var url=req.url
    if(url==='/html'){
        fs.readFile('./resource/html.html',function(error,data){
            if(error){
                console.log('读取文件失败')
            }else{
                res.setHeader('content-type','text/html;charset=UTF-8')
                res.end(data)
            }
        })
    }else if(url==='/css'){
        fs.readFile('./resource/css.css',function(error,data){
            if(error){
                console.log('读取文件失败')
            }else{
                res.setHeader('content-type','text/css;charset=UTF-8')
                res.end(data)
            }
        })
    }else{
        res.end('404 not found')
    }
    
   
})
server.listen(3000,function(){
    console.log('the server is running......')
})
