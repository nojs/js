

var gg=require("no/gg").gg
var lx=require("./lexer")

var _expr={
  parse:function(){
    return expr.parse.apply(expr,arguments)}}
var _expr_no_top_comma={
  parse:function(){
    return expr_no_comma.parse.apply(expr_no_comma,arguments)}}

module.exports={
  expr:_expr,
  expr_no_top_comma:_expr_no_top_comma}

var js_object=require("./object")
var js_array=require("./array")

var _=require("./meta")
var splice=_.splice
var quote=_.quote

var stat=require("./stat").stat
var id=require("./id")

var expr=gg.expr([],{
  primary:gg.choice([
    gg.mseq([
      [["(",_expr,")"],{builder:function(ee){
        return ["Paren",ee[0]]}}],
      [["function",gg.opt(id),"(",
        gg.list([id,","]),")","{",
        gg.list([stat]),"}"],
       {builder:function(ee){
         return ["Function",ee[0],ee[1],ee[2]]
         return ["Function",{
           "name":ee[0],
           "args":ee[1],
           "body":ee[2]}]}}]]),
    id,
    js_array,
    js_object,
    splice,
    quote,
    //gg.regexp,
    gg.string,
    gg.number]),
  prefix:[
    [["new"],{prec:10,assoc:"right",builder:function(op,e){
      return ["Op","New",e]}}],
    [["++"],{prec:30,builder:function(op,e){
      return ["Op","++X",e]}}],
    [["--"],{prec:30,builder:function(op,e){
      return ["Op","--X",e]}}],
    [["!"],{prec:40,builder:function(op,e){
      return ["Op","!",e]}}],
    [["~"],{prec:40,builder:function(op,e){
      return ["Op","~",e]}}],
    [["+"],{prec:40,builder:function(op,e){
      return ["Op","+X",e]}}],
    [["-"],{prec:40,builder:function(op,e){
      return ["Op","-X",e]}}],
    [["typeof"],{prec:40,builder:function(op,e){
      return ["Op","typeof",e]}}],
    [["void"],{prec:40,builder:function(op,e){
      return ["Op","void",e]}}],
    [["delete"],{prec:40,builder:function(op,e){
      return ["Op","delete",e]}}]],
  infix:[
    [["*"],{prec:50,builder:function(e1,op,e2){
      return ["Op","*",e1,e2]}}],
    [["/"],{prec:50,builder:function(e1,op,e2){
      return ["Op","/",e1,e2]}}],
    [["%"],{prec:50,builder:function(e1,op,e2){
      return ["Op","%",e1,e2]}}],
    [["+"],{prec:60,builder:function(e1,op,e2){
      return ["Op","+",e1,e2]}}],
    [["-"],{prec:60,builder:function(e1,op,e2){
      return ["Op","-",e1,e2]}}],
    [[">>"],{prec:70,builder:function(e1,op,e2){
      return ["Op",">>",e1,e2]}}],
    [["<<"],{prec:70,builder:function(e1,op,e2){
      return ["Op","<<",e1,e2]}}],
    [[">>>"],{prec:70,builder:function(e1,op,e2){
      return ["Op",">>>",e1,e2]}}],
    [[">"],{prec:80,builder:function(e1,op,e2){
      return ["Op",">",e1,e2]}}],
    [["<"],{prec:80,builder:function(e1,op,e2){
      return ["Op","<",e1,e2]}}],
    [["<="],{prec:80,builder:function(e1,op,e2){
      return ["Op","<=",e1,e2]}}],
    [[">="],{prec:80,builder:function(e1,op,e2){
      return ["Op",">=",e1,e2]}}],
    [["in"],{prec:80,builder:function(e1,op,e2){
      return ["Op","in",e1,e2]}}],
    [["instanceof"],{prec:80,builder:function(e1,op,e2){
      return ["Op","instanceof",e1,e2]}}],
    [["=="],{prec:90,builder:function(e1,op,e2){
      return ["Op","==",e1,e2]}}],
    [["!="],{prec:90,builder:function(e1,op,e2){
      return ["Op","!=",e1,e2]}}],
    [["==="],{prec:90,builder:function(e1,op,e2){
      return ["Op","===",e1,e2]}}],
    [["!=="],{prec:90,builder:function(e1,op,e2){
      return ["Op","!==",e1,e2]}}],
    [["&"],{prec:100,builder:function(e1,op,e2){
      return ["Op","&",e1,e2]}}],
    [["^"],{prec:110,builder:function(e1,op,e2){
      return ["Op","^",e1,e2]}}],
    [["|"],{prec:120,builder:function(e1,op,e2){
      return ["Op","|",e1,e2]}}],
    [["&&"],{prec:130,builder:function(e1,op,e2){
      return ["Op","&&",e1,e2]}}],
    [["||"],{prec:140,builder:function(e1,op,e2){
      return ["Op","||",e1,e2]}}],
    [["="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return ["Op","=",e1,e2]}}],
    [["+="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return ["Op","+=",e1,e2]}}],
    [["-="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return  ["Op","-=",e1,e2]}}],
    [["*="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return ["Op","*=",e1,e2]}}],
    [["/="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return ["Op","/=",e1,e2]}}],
    [["%="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return ["Op","%=",e1,e2]}}],
    [["<<="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return ["Op","<<=",e1,e2]}}],
    [[">>="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return ["Op",">>=",e1,e2]}}],
    [[">>>="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return ["Op",">>>=",e1,e2]}}],
    [["&="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return ["Op","&=",e1,e2]}}],
    [["^="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return ["Op","^=",e1,e2]}}],
    [["|="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return ["Op","|=",e1,e2]}}],
    [[","],{prec:170,builder:function(e1,op,e2){
      return ["Op",",",e1,e2]}}]],
  suffix:[
    [[".",id],{prec:10,builder:function(e,op){
      return ["Dot",e,op[0]]}}],
    [["[",_expr,"]"],{prec:10,builder:function(e,op){
      return ["Idx",e,op[0]]}}],
    [["(",gg.list([_expr_no_top_comma,","]),")"],
     {prec:20,builder:function(e,op){
       return ["Call",e,op[0]]}}],
    [["++"],{prec:30,builder:function(e,op){
      return ["Op","X++",e]}}],
    [["--"],{prec:30,builder:function(e,op){
      return ["Op","X--",e]}}],
    [["?",_expr,":",_expr],{prec:150,builder:function(e,op){
      return ["Cond",e,op[0],op[1]]}}]],
})


var expr_no_comma=gg.expr([],{
  primary:gg.choice([
    gg.mseq([
      [["(",_expr,")"],{builder:function(ee){
        return ["Paren",ee[0]]}}],
      [["function",gg.opt(id),"(",
        gg.list([id,","]),")","{",
        gg.list([stat]),"}"],
       {builder:function(ee){
         return ["Function",ee[0],ee[1],
           ee[2]]}}]]),
    id,
    js_array,
    js_object,
    //gg.regexp,
    quote,
    splice,
    gg.string,
    gg.number]),
  prefix:[
    [["new"],{prec:10,assoc:"right",builder:function(op,e){
      return ["Op","New",e]}}],
    [["++"],{prec:30,builder:function(op,e){
      return ["Op","++X",e]}}],
    [["--"],{prec:30,builder:function(op,e){
      return ["Op","--X",e]}}],
    [["!"],{prec:40,builder:function(op,e){
      return ["Op","!",e]}}],
    [["~"],{prec:40,builder:function(op,e){
      return ["Op","~",e]}}],
    [["+"],{prec:40,builder:function(op,e){
      return ["Op","+X",e]}}],
    [["-"],{prec:40,builder:function(op,e){
      return ["Op","-X",e]}}],
    [["typeof"],{prec:40,builder:function(op,e){
      return ["Op","typeof",e]}}],
    [["void"],{prec:40,builder:function(op,e){
      return ["Op","void",e]}}],
    [["delete"],{prec:40,builder:function(op,e){
      return ["Op","delete",e]}}]],
  infix:[
    [["*"],{prec:50,builder:function(e1,op,e2){
      return ["Op","*",e1,e2]}}],
    [["/"],{prec:50,builder:function(e1,op,e2){
      return ["Op","/",e1,e2]}}],
    [["%"],{prec:50,builder:function(e1,op,e2){
      return ["Op","%",e1,e2]}}],
    [["+"],{prec:60,builder:function(e1,op,e2){
      return ["Op","+",e1,e2]}}],
    [["-"],{prec:60,builder:function(e1,op,e2){
      return ["Op","-",e1,e2]}}],
    [[">>"],{prec:70,builder:function(e1,op,e2){
      return ["Op",">>",e1,e2]}}],
    [["<<"],{prec:70,builder:function(e1,op,e2){
      return ["Op","<<",e1,e2]}}],
    [[">>>"],{prec:70,builder:function(e1,op,e2){
      return ["Op",">>>",e1,e2]}}],
    [[">"],{prec:80,builder:function(e1,op,e2){
      return ["Op",">",e1,e2]}}],
    [["<"],{prec:80,builder:function(e1,op,e2){
      return ["Op","<",e1,e2]}}],
    [["<="],{prec:80,builder:function(e1,op,e2){
      return ["Op","<=",e1,e2]}}],
    [[">="],{prec:80,builder:function(e1,op,e2){
      return ["Op",">=",e1,e2]}}],
    [["in"],{prec:80,builder:function(e1,op,e2){
      return ["Op","in",e1,e2]}}],
    [["instanceof"],{prec:80,builder:function(e1,op,e2){
      return ["Op","instanceof",e1,e2]}}],
    [["=="],{prec:90,builder:function(e1,op,e2){
      return ["Op","==",e1,e2]}}],
    [["!="],{prec:90,builder:function(e1,op,e2){
      return ["Op","!=",e1,e2]}}],
    [["==="],{prec:90,builder:function(e1,op,e2){
      return ["Op","===",e1,e2]}}],
    [["!=="],{prec:90,builder:function(e1,op,e2){
      return ["Op","!==",e1,e2]}}],
    [["&"],{prec:100,builder:function(e1,op,e2){
      return ["Op","&",e1,e2]}}],
    [["^"],{prec:110,builder:function(e1,op,e2){
      return ["Op","^",e1,e2]}}],
    [["|"],{prec:120,builder:function(e1,op,e2){
      return ["Op","|",e1,e2]}}],
    [["&&"],{prec:130,builder:function(e1,op,e2){
      return ["Op","&&",e1,e2]}}],
    [["||"],{prec:140,builder:function(e1,op,e2){
      return ["Op","||",e1,e2]}}],
    [["="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return ["Op","=",e1,e2]}}],
    [["+="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return ["Op","+=",e1,e2]}}],
    [["-="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return  ["Op","-=",e1,e2]}}],
    [["*="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return ["Op","*=",e1,e2]}}],
    [["/="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return ["Op","/=",e1,e2]}}],
    [["%="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return ["Op","%=",e1,e2]}}],
    [["<<="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return ["Op","<<=",e1,e2]}}],
    [[">>="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return ["Op",">>=",e1,e2]}}],
    [[">>>="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return ["Op",">>>=",e1,e2]}}],
    [["&="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return ["Op","&=",e1,e2]}}],
    [["^="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return ["Op","^=",e1,e2]}}],
    [["|="],{prec:160,assoc:"right",builder:function(e1,op,e2){
      return ["Op","|=",e1,e2]}}]],
  suffix:[
    [[".",id],{prec:10,builder:function(e,op){
      return ["Dot",e,op[0]]}}],
    [["[",_expr,"]"],{prec:10,builder:function(e,op){
      return ["Idx",e,op[0]]}}],
    [["(",gg.list([_expr_no_top_comma,","]),")"],
     {prec:20,builder:function(e,op){
       return ["Call",e,op[0]]}}],
    [["++"],{prec:30,builder:function(e,op){
      return ["Op","X++",e]}}],
    [["--"],{prec:30,builder:function(e,op){
      return ["Op","X--",e]}}],
    [["?",_expr,":",_expr],{prec:150,builder:function(e,op){
      return ["Cond",e,op[0],op[1]]}}]],
})


