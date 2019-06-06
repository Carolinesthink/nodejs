//art-template不仅可以在浏览器中使用，还可以在node中使用
//默认下载到node_modules目录，不要改也不支持改
//不关心内容，只关心自己认识的模板标记语法，随便把{{}}放在任何地方，有意义就行
//模板引擎最早诞生于服务器端，后来才发展到了前端

//反引号支持换行

//1安装npm install art-template
//2在需要的文件模块中加载art-template只需要使用require('art-template')
//3查文档，使用模板引擎api
// 浏览器中template（script标签，{对象}）
//从文件中读取到的data是二进制数据，而模板引擎的render方法需要的是字符串，所以需要把data二进制数据转换成字符串

//服务端渲染，本质就是字符串替换

var http=require('http')
var fs=require('fs')
var template=require('art-template')
var server=http.createServer()
server.on('request',function(req,res){
    fs.readFile('./template2.html',function(err,data){
       
        if(err){
            return res.end('404 not found')
        }
        fs.readdir('E:/Caroline/www',function(err,files){
            var htmlStr=template.render(data.toString(),{
                title:'目录列表',
                files:files
            }) 
            res.end(htmlStr)
            console.log(htmlStr)
        })
       
    })
       
})
server.listen(3000,function(){
    console.log('The server is running...')
})
