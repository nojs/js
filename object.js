
var gg=require("no/gg").gg
var lx=require("./lexer")

var expr=require("./expr")

var js_object=gg.seq(
  ["{",
   gg.list(
     [gg.seq(
       [gg.choice(
         [gg.id,
          gg.string,
          gg.number]),":",expr],
       {builder:function(ee){
         return ["Pair",ee[0],ee[1]]}})]),
   "}"],{
     builder:function(ee){
       return ["Object",ee]}})

module.exports=js_object


