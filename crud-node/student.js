/**数据操作文件模块
 * 职责：操作文件的数据，
 * 只处理数据，不关心业务
 * 
 * 这里才是学习node的真正意义所在
 */

 //异步编程，使用者负责传递，封装者负责调用
var fs=require('fs')
 var dbpath='./db.json'
/**
 * 获取所有学生列表
 * return []
 * callback中的参数
 *      第一个参数是err
 *          成功是null
 *          错误是 错误对象
 *      第二个参数是 data
 *          成功是数组，
 *          错误是undefined
 */
exports.find=function(callback){

    /* readFile的第二个参数是可选的，传入utf-8，就是告诉它把读取到的文件直接按utf-8编码转成我们认识的字符，
         除了这样转换，还可以用data.toString()的方式
         从文件中读取到的数据一定是字符串，使用一定要手动转换成对象*/
        fs.readFile(dbpath,'utf8',function(err,data){//因为此处的是二进制数据，所以要么转换为字符串，要么用utf-8编码
            if(err){
                return callback(err)
            }
            callback(null,JSON.parse(data).students)
        })
}
/**
 * 根据id获取学生信息对象
 */
exports.findById=function(id,callback){
    fs.readFile(dbpath,'utf8',function(err,data){//因为此处的是二进制数据，所以要么转换为字符串，要么用utf-8编码
        if(err){
            return callback(err)
        }
        var students=JSON.parse(data).students
        var stu=students.find(function(item){
            return id==item.id
        })
        callback(null,stu)
        
    })

}


 /**
 * 添加保存学生
 */

 exports.save=function(student,callback){
     fs.readFile(dbpath,'utf-8',function(err,data){
         if(err){
             return callback(err)
         }
         var students=JSON.parse(data).students

         student.id=students[students.length-1].id+1
         //用户传递的对象保存到数组中
         students.push(student)

         strStu=JSON.stringify({students:students})
         //写入用户信息
         fs.writeFile(dbpath,strStu,function(err){
             if(err){
                 return callback(err)
             }
             callback(null)
         })

     })

 }
 /**
 * 更新学生
 */
exports.updateById=function(student,callback){
    fs.readFile(dbpath,'utf8',function(err,data){//因为此处的是二进制数据，所以要么转换为字符串，要么用utf-8编码
        if(err){
            return callback(err)
        }
        var students=JSON.parse(data).students
        var stu=students.find(function(item){
            return item.id==student.id//文件中的ID和表单提交的ID
        })
        for(key in student)
        {
            stu[key]=student[key]
        }  
        strStu=JSON.stringify({students:students})
        //写入用户信息
        fs.writeFile(dbpath,strStu,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
   
    })



}
//想想怎么调用
 /**
 *删除学生
 */
exports.delete=function(id,callback){
    fs.readFile(dbpath,'utf8',function(err,data){//因为此处的是二进制数据，所以要么转换为字符串，要么用utf-8编码
        if(err){
            return callback(err)
        }
       var students=JSON.parse(data).students
       var delId=students.findIndex(function(item){
           return id==item.id
       })
       students.splice(delId,1)
       var fileData=JSON.stringify({students:students})

       fs.writeFile(dbpath,fileData,function(err){
        if(err){
            return callback(err)
        }
        callback(null)
    })

    })
}