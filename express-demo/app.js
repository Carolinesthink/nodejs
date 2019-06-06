var express=require('express')
var app=express()
//路由，可以链式调用，当以get请求时，执行对应的处理函数
app.get('/',function(req,res){
    res.send('hello world')
})
//当以/public/开头的时候，去'./public/'目录中找对应的文件
// app.use('/public/',express.static('./public/'))【推荐使用】
// app.use(express.static('./public/'))简写形式，请求时前面不用加public，
//直接访问具体资源，加public就错了
// a是public的别名，后面必须跟上Public目录里的文件名，而不用加public
app.use('/a/',express.static('./public/'))
app.get('/login',function(req,res){
    res.send('login')
})
app.get('/about',function(req,res){
    res.send('about')
})
app.listen(3000,function(){
    console.log('express app is running...')
})