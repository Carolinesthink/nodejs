require('./a')
//已经被加载过了，可以拿到其中的加载对象，不会重新执行里面的代码
require('./b')
require(模块标识符)//如果是非路径模式的模块标识,
//路径形式的模块标识
//  ./ ../  /xxx(几乎不用，/表示当前文件模块所属磁盘根路径) d:/a/foo.js几乎不用

//核心模块的本质也是文件，核心模块文件已经被编译到了二进制文件中，只要按名字加载就可以了

//第三方模块art-template，所有第三方模块通过npm 加载，通过require（包名）来加载
//不可能有第三方包和核心模块的名字是一样的，既不是核心模块，也不是路径形式的模块，
//先找当亲文件所处目录中的node-modules目录
//node-modules/art-template
//node_modules/art-template/package.json文件
//node_modules/art-template/package.json文件中的main属性
//main属性中就记录了art-template的入口模块
//然后加载使用第三方包，实际上最终加载的还是文件

//如果package的文件不存在，或者main指定的入口文件也没有，则node会默认查找index.js
//也就是说index.js是默认备选项 

//如果以上所有任何一个条件不成立，则会进入上一级目录中node-modules目录中查找，
//如果还找不到，则一层一层查找，直到当前磁盘根目录还找不到，最后报错

//注意一个项目中有且只有一个node-modules，放在项目根目录中，这样项目中所有子目录都能用到