// 模块职责要单一，增强代码的可维护性

var fs=require('fs')
var Student=require('./student')

//express提供了一种更好的方式，专门用来包装路由的
var express=require('express')

//1创建一个路由容器
var router=express.Router()

//2把路由都挂载到路由容器中
router.get('/students',function(req,res){
    Student.find(function(err,data){
        if(err){
           return res.send('500,server is wrong')
        }
        res.render('index.html',{
            students:data
        })
    })
   

        
        
     
})


router.get('/students/new',function(req,res){
    res.render('new.html')
})


//还不能在这边把相应的地址改为其他的，只能是get对应的地址
router.post('/students/new',function(req,res){
    //1获取表单数据
    Student.save(req.body,function(err){
        if(err){
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    
       
    })
    // console.log(req.body)
    //2处理
    //将数据保存到db.json文件用以持久化
    //3发送响应
    /*先读取出来转换成对象，
    然后往对象中push数据，
    然后把对象转为字符串
    然后将字符串写入文件 */
})


router.get('/students/edit',function(req,res){
    Student.findById(req.query.id,function(err,student){
        if(err){
            return res.status(500).send('Server wrong')
        }
        res.render('edit.html',{
            student:student
        })

    })

})


router.post('/students/edit',function(req,res){
    Student.updateById(req.body,function(err){
        if(err){
            return res.status(500).send('Server wrong')
        }
        res.redirect('/students')
    })
    console.log(req.body)
})


router.get('/students/delete',function(req,res){
        Student.delete(req.query.id,function(err){
            if(err){
                return res.status(500).send('server wrong')
            }
            res.redirect('/students')
        })
})

//3导出router

module.exports=router
// module.exports=function(app){
//     var fruits=['苹果','香蕉','梨子']
//     app.get('/',function(req,res){


//         /* readFile的第二个参数是可选的，传入utf-8，就是告诉它把读取到的文件直接按utf-8编码转成我们认识的字符，
//          除了这样转换，还可以用data.toString()的方式
//          从文件中读取到的数据一定是字符串，使用一定要手动转换成对象*/
//          fs.readFile('db.json','utf-8',function(err,data){
//              if(err){
//                  res.status(500).send('server is wrong')
//              }else{
//                  var students=JSON.parse(data).students
//                  res.render('index.html',{
//                      fruits:fruits,
//                      students:students
//                  })
     
//              }
//          })
         
//      })
      
// }