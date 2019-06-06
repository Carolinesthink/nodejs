//加载得到的是对象，有时候对于一个模块只需要一个方法
var foo=require('./foo')
//如果一个模块需要直接使用某个变量，而不是挂载的方式，使用module.exports=add
console.log(foo.add(2,3))