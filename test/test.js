var compile=require('../')

var path=require('path')
var fs=require('fs')

var cnt=fs.readFileSync(path.resolve('test/test.vue'),'utf-8')

var res=compile(cnt,true)

fs.writeFile(path.resolve('test/result.vue'),res,function(){
	console.log('write success')
})
