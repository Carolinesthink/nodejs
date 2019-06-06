//fs核心模块中提供了所有的文件操作相关的API
//使用require
var fs=require('fs')
fs.readFile('./02file.js',function(error,data){
    console.log(data.toString())
})
//文件中默认存储的是二进制数据，从文件中读的是二进制数据，用toString转换成我们看得懂的 二进制转为 十六进制，用toString转化为我们认识的