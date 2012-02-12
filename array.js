 
var gg=require("no/gg").gg
var lx=require("./lexer")

module.exports={
  parse:function(){
    return js_array.parse.apply(js_array,arguments)}}

var _=require("./expr"),expr=_.expr
var expr_no_top_comma=_.expr_no_top_comma

var js_array=gg.seq(
  ["[",gg.list([expr_no_top_comma,","]),"]"],
  {builder:function(ee){
    return ["Array",ee[0]]}})


