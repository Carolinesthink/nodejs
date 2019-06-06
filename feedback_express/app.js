var express=require('express')
var fs=require('fs')
var app=express()
var bodyParser=require('body-parser')


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
app.use('/public/',express.static('./public/'))


// 解析 application/json
app.use(bodyParser.json()); 
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

//配置使用art-template模板引擎
//第一个参数表示当渲染以.art结尾的文件的时候，.art也可以改为其他后缀名，使用art-template模板引擎
//express-art-template是转么用来在express中吧art-template整合到express中，
//虽然这里不需要加载art-temlate，但必须安装，因为express-art-template依赖于他
app.engine('html',require('express-art-template'))

//express为response相应对象提供了一个方法render
//render方法默认是不可以使用的，但是配置了模板引擎就可以使用了
//res.render('html模板名',{模板数据})
//第一个参数不能写路径，默认会去项目中的views文件夹下找该模板文件
//也就是说，express有一个约定：开发人员把所有的视图文件都放到views目录中
//如果想要修改views目录，则可以
// app.set('views',目录路径)
app.get('/',function(req,res){
    res.render('index.html',{
        dataList:dataList
    })
})

app.get('/post',function(req,res){

    res.render('addpage.html')
    // fs.readFile('./views/addpage.html',function(err,data){
    //     if(err){
    //         return console.log(err)
    //     }
    //     res.send(data)
    // })
   
})
//以post方式请求/post
app.post('/post',function(req,res){
    
    var data=req.body
    data.dateTime='2019-06-03'
    dataList.unshift(data)
    res.redirect('/')
    req.body
})

// app.get('/addMsg',function(req,res){
//     // res.render('addpage.html')
//     var data=req.query
//     data.dateTime='2019-06-03'
//     dataList.unshift(data)
//     res.redirect('/')
// })

app.listen(3000,function(){
    console.log('running......')
})