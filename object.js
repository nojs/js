
var gg=require("no/gg").gg
var lx=require("./lexer")

module.exports={
  parse:function(){
    return js_object.parse.apply(js_object,arguments)}}

var _=require("./expr")
var expr=_.expr
var expr_no_top_comma=_.expr_no_top_comma

var js_object=gg.seq(
  ["{",
   gg.list(
     [gg.seq(
       [gg.choice(
         [gg.id,
          gg.string,
          gg.number]),":",expr_no_top_comma],
       {builder:function(ee){
         return ["Pair",ee[0],ee[1]]}}),
      gg.opt(",")]),
   "}"],{
     builder:function(ee){
       return ["Object",ee[0]]}})



