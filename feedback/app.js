var http=require('http')
var fs=require('fs')
var url=require('url')
var template=require('art-template')
//当前模块所有需要的依赖项都放在最前面
//为了让目录结构同意清晰，把所有HTML文件放入views
//res.end(data),data既可以是二进制也可以是字符串，当需要操作字符串才要转
/*浏览器收到HTML响应以后，从上到下依次解析，当解析时，如果发现：
link
Script
img
iframe
video
Audio
等带有src或者href(link)属性标签（具有外链资源）的时候，浏览器会自动对这些资源发起的请求
*/

//页面中的每一个外链资源都是请求
/*
为了方便统一处理这些静态资源，所以我们约定把他们放到public文件夹下
 */
//哪些资源可以被用户访问，哪些资源不能被访问，现在可以通过代码进行灵活控制

var dataList=[{
    name:'zhangsan',
    message:'i am happy',
    dateTime:'2019-05-30'
},{
    name:'zhangsan2',
    message:'i am sad',
    dateTime:'2019-05-30'
},{
    name:'zhangsan3',
    message:'i am fast',
    dateTime:'2019-05-30'
},{
    name:'zhangsan4',
    message:'i am slow',
    dateTime:'2019-05-30'
}]
http
    .createServer(function(req,res){
        //使用url.parse(url,true)获取不包含查询字符串的地址，希望拿出参数对象parseObj.query
        var parseObj=url.parse(req.url,true)
        var pathname=parseObj.pathname
        if(pathname==='/'){
            fs.readFile('./views/index.html',function(err,data){
                if(err){
                    
                        res.end('404 not found')
                        
                    
                }else{
                    data=data.toString()
                    var htmlStr=template.render(data,{
                        dataList:dataList

                    })
                    res.end(htmlStr)
                }

            })//url变得简洁
        }else if(pathname==='/post'){
            fs.readFile('./views/addpage.html',function(err,data){
                if(err){
                    return res.end('404 not found')
                }
                res.end(data)
            }
            )

        }else if(pathname==='/addMsg'){
            //将生成日期添加到对象中，存储到数组中
            //用户重定向跳转到首页/用户重新请求的时候，数组中数据已经发生 了变化
            //一次请求对应一次响应，响应结束，此次请求结束
            // res.end(JSON.stringify(parseObj.query))
            var comment=parseObj.query
            comment.dataTime='2019-5-31'//为什么dataTime加不进去，需要同一个路由器下才能访问吗
            dataList.push(comment)
            //服务端这个时候数据已经存储好了，接下来让用户重新请求首页
           
            //如何通过服务器让客户端重定向？
            //1状态码设置为302  临时重定向
            //2在响应头中通过location告诉客户端往哪儿重定向
            //如果客户端发现收到服务端的响应状态码是302，
            //就会自动取响应头中找location，所以能看到客户端自动跳转了
            res.statusCode=302
            res.setHeader('location','/')//也可以写成http://127.0.0.1:3000
            res.end()
        }else if(pathname.indexOf('/public/')===0)
        {
            fs.readFile('.'+url,function(err,data){
                if(err){
                    return res.end('404 not found')
                }
                res.end(data)
            }
            )
        }else{//其他的都处理成404找不到
            fs.readFile('./views/err.html',function(err,data){
                if(err){
                    return res.end('404 not found')
                }
                res.end(data)
            }
            )

        }
       
        /*请求页面中，这些静态资源的获取标签，路劲前面不用写端口号及其以前的地址
        写上路径就行，页面进行请求时会自动加上
        */

        /*如果请求路径是以/public开头的，则我们认为要获取的public的某个资源，
        请求路径当做文件路径来读取*/
       //                                                 

})
    .listen(3000,function(){
        console.log('running...')

})