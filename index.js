'use strict';

var loaderUtils = require("loader-utils")

var trim=require('./lib/trim')

var tagName='scope'

var sourceTag="<!--\\s*(\\/?)"+tagName+"\\s*([\\s\\S]*?)\\s*-->"
var sourceTpl="<!--\\s*\\/?"+tagName+"\\s*[\\s\\S]*?\\s*-->"
var scopeTagReg=new RegExp(sourceTag,'gm')
var sourceTplReg=new RegExp(sourceTpl,'gm')
var scopeTagCntReg=new RegExp(sourceTag,'m')

var VAR_START='__'
var LEGAL_VAR_REG=/\s*__.+?\s*/  //变量命名是否合法,不需要以__开头变量

function compile(source,isNotWebpack){
	var res
	if(!isNotWebpack){
		var query = loaderUtils.getOptions(this) || {}; 
		this.cacheable && this.cacheable()
	}
	source=source||''
	var tags=source.match(scopeTagReg) || []  
	var len=tags.length
	if(!len) return source
    if(len%2){
    	throw new Error(tagName+' is not closed')
    }
    var tpls=source.split(sourceTplReg) //这里有个超级大的坑，正则表达式里面如果有可捕获的括号，那么会被放到数组里面
    var footer=tpls.pop()
    var header=tpls.shift()
    var root={}      //根节点
    var tagTree=walk(tags,tpls,root)

	return header+tpls.join('')+footer
}

module.exports = compile

function walk(tags,tpls,root){
	var currNode=root
	
	tags.forEach((tag,index)=>{
		currNode.childNodes=currNode.childNodes || []
		var cnt=tag.match(scopeTagCntReg) || []
		var exps=cnt[2] || ''
		//表示是结束标签tag
		if(cnt[1]){
			var tpl=(tpls.slice(currNode.start,index) || []).join('')
			// Object.assign(currNode,{e_tag:tag,tpl:tpl})
			Object.keys(currNode.exp).forEach(key=>{
				tpl = (tpl || '').replace(new RegExp(key,'gm'),"("+currNode.exp[key]+")")
			})
			tpls[currNode.start]=tpl       //更新tpls
			for(var i=currNode.start+1;i<index;i++){
				tpls[i]=''
			}
			currNode=currNode.parentNode
			return
		}
		var node={s_tag:tag,start:index}
		var expObj={}
		var vecExps=exps.match(/\s*([^=]+?)=\s*["'`]([^"'`]+?)["'`]\s*/gm) || []
		vecExps.forEach(exp=>{
			var part=exp.match(/\s*(var)?\s*([^=]+?)=\s*["'`]([^"'`]+?)["'`]/m) || []
			if(!part.length) return
			if(part[2] && !part[2].match(LEGAL_VAR_REG)){
				//名称
				throw new Error(trim(exp)+' variable must be start with'+VAR_START)
			}else if(part[2]){
				var keys=Object.keys(expObj)
				if(part[3] === null || part[3]===undefined){
					part[3]=''
				}
				keys.some(key=>{
					var keyReg=new RegExp(key,'gm')
					var keyMatched=part[3].match(keyMatched)
					if(keyMatched){
						part[3]=part[3].replace(keyReg,"("+expObj[key]+")")
					}
				})
				expObj[trim(part[2])]=trim(part[3])    //以变量名为key，变量值为value
			}
		})
		node.exp=expObj
		node.parentNode=currNode
		currNode.childNodes.push(node)
		currNode=node
	})
	return root
}


