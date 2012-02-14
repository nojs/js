


var _splice={
  parse:function(){
    return splice.parse.apply(splice,arguments)}}

var _quote={
  parse:function(){
    return quote.parse.apply(quote,arguments)}}

module.exports={
  splice:_splice,
  quote:_quote}

var expr=require("./expr").expr
var _=require("./stat")
var block=_.block,stat=_.stat
var gg=require("no/gg").gg

var splice=gg.seq(
  [",{",
   gg.choice(
     [expr,
      stat,
      block]),
   "}"],{builder:function(ee){
     return ["Splice",ee[0]]}})

var quote=gg.seq(
  ["`{",
   gg.choice(
     [expr,
      stat,
      block]),
   "}"],{builder:function(ee){
     return ["Quote",ee[0]]}})





