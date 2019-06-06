

//一个请求对应一个响应，没有请求就没有响应，服务器绑定端口号，实际是应用程序绑定的
//吃了可以content-type用来指定编码，html中的meta元数据也可以生命当前文本的编码格式，浏览器也会识别
//当
var http=require('http')
var fs=require('fs')
//1如何得到目录列表中的文件名和目录名

//2如何将得到的文件名和目录名替换到 模板引擎
//2.1 在template中预留出替换的
//2.2根据files生成需要的内容
//2.3发送响应
var server=http.createServer()
var BaseUrl='E:/Caroline/www'
server.on('request',function(req,res){
    var url=req.url
    var filePath='/'
    
    if(url!=='/'){
        filePath=url
        //文件拓展名要写上
        var content=''

        fs.readFile('./template.html',function(err,data){
            if(err){
                res.end('404 not found')
                
            }else{
                // res.setHeader('content-type','text/html;charset=utf-8')
                fs.readdir( BaseUrl,function(err,files){
                    if(err){
                        res.end('can not find files')
                    }else{
                       
                        for(var i=0;i<files.length;i++){
                            content+=`<tr>
                                        <td><a class='icon dir' href="E:/Caroline/www/index.html">${files[i]}</a></td>
                                        <td>342B</td>
                                        <td>2019/03/13</td>
                                    </tr>`
                                    console.log(files[i])
                        }
                        data=data.toString()
                        data.replace('#_#',content)//为何替换不成功
                        console.log(content)
                        console.log(data)
                        //发送解析替换后的响应数据
                        res.end(data)   
                    }
                })
                // res.end(data)//计算机中存放的是二进制文件
            
            }
        })
    }else{
        fs.readFile(BaseUrl+'/index.html',function(err,data){
            if(err){
                res.end('404 not found')
                
            }else{
                // res.setHeader('content-type','text/html;charset=utf-8')
                res.end(data)//计算机中存放的是额二进制文件
            
            }
        })

    }
    


})
server.listen(3000,function(){
    console.log('running...')
})