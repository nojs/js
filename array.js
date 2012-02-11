
var gg=require("no/gg").gg
var lx=require("./lexer")

var expr=require("./expr")

var js_array=gg.seq(
  ["[",gg.list([expr,","]),"]"],{
    builder:function(ee){
      return ["Array",ee[0]]}})

module.exports=js_array

