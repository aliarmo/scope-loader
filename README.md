# scope-loader
define local scope for all popular frame when you write your template,
eg: Vue/Angular/React.It's just a syntax sugar.
You can use it as a webpack loader,then you define local scope,and you never need to write long and 
long object path.


# Usage
I give an example using Vue,of course,it works with others frontend frame's template.
Say you have to write an user.vue component

normally, your user.vue code will be:
```
<template>
	<div>
  	  <p>{{data.users && data.users[0] && data.users[0].name}}</p>
  	  <p>{{data.users && data.users[0] && data.users[0].age}}</p>
  	  <p>{{data.users && data.users[0] && data.users[0].gender}}</p>
  	  <div>
  	  	<p>{{data.users && data.users[0] && data.users[0].parents 
  	  		&& data.users[0].parents[0] && data.users[0].parents[0].father}}</p>
  	  </div>
  	</div>
</template>
```
well,we write data.users[0] repeatedly,long and boring.
scope-loader solve this problem.The only thing you need to do is add scope-loader for your .vue file.

install scope-loader
```
npm install scope-loader --save-dev
```
webpack4 loader config.
attention：vue-loader version must be 10.1.0 or higher,for detail:(https://github.com/vuejs/vue-loader/issues/542)
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader','scope-loader']
      }
    ]
  }
}
```
then,your user.vue code can be:
```
<template>
<!-- scope 
	var __user="data.users && data.users[0] || {}"
-->
	<div>
	  <p>{{__user.name}}</p>
	  <p>{{__user.age}}</p>
	  <p>{{__user.gender}}</p>
	  <div>
	  	<!-- scope 
  			var __parents="__user.parents && __user.parents[0]" -->
  	  	<p>{{__parents.father}}</p>
  	  	<!-- /scope -->
  	  </div>
	</div>
<!-- /scope -->
</template>
```
You can use html comments to define your local variable,which is available for the template in side the start scope and end scope.And it can be nested. As follows,"__user" is totally equals to 
"data.users && data.users[0] || {}"
```
<!-- scope 
	var __user="data.users && data.users[0] || {}"
-->

<!-- /scope -->
```
Attention:the variable you define must be start with "__",otherwise,it won't work.

中文版README(https://zhuanlan.zhihu.com/p/39968059)