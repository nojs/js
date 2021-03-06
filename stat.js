
var gg=require("no/gg").gg
var lx=require("./lexer")

var _stat={
  parse:function(){
    return stat.parse.apply(stat,arguments)}}

var block=gg.list([_stat,gg.opt(";")])

module.exports={
  stat:_stat,
  block:block}

var _=require("./expr")
var expr=_.expr
var expr_no_top_comma=_.expr_no_top_comma
var id=require("./id")
var splice=require("./meta").splice

var match_builder=require("./match").build

var for_header=gg.choice(
  [gg.seq([_stat,_stat,_stat],
          {builder:function(ee){
            return ["For_num",ee[0],ee[1],ee[2]]}}),
   gg.seq(["var",id,"in",expr],
          {builder:function(ee){
            return ["For_in",ee[0],ee[1]]}}),
   gg.seq([id,"in",expr],
          {builder:function(ee){
            return ["For_in",ee[0],ee[1]]}})])

var atomic_stat=gg.mseq([
  [["var",gg.list(
    [gg.seq([id,
             gg.opt(
               gg.seq(
                 ["=",expr_no_top_comma],
                 {builder:function(ee){return ee[0]}}))],
            {builder:function(ee){
              return ee}}),
     ","])],
   {builder:function(ee){
     return ["Var",ee[0]]}}],
  [["if","(",expr,")",_stat,
    gg.opt(
      gg.seq(["else",_stat],
             {builder:function(ee){
               return ee[0]}}))],
   {builder:function(ee){
     return ["If",ee[0],ee[1],ee[2]]}}],
  [["{",block,"}"],{builder:function(ee){
    return ["Block",ee[0]]}}],
  [["while","(",expr,")",_stat],{builder:function(ee){
    return ["While",ee[0],ee[1]]}}],
  [["for","(",for_header,")",_stat],{builder:function(ee){
    return ["For",ee[0],ee[1]]}}], //FIXME
  [["do",_stat,"while","(",expr,")"],
   {builder:function(ee){
     return ["Do",ee[1],ee[0]]}}],
  [["return",gg.opt(expr)],
   {builder:function(ee){
     return ["Return",ee[0]]}}],
  [["continue",gg.opt(id)],
   {builder:function(ee){
     return ["Continue",ee[0]]}}],
  [["break",gg.opt(id)],
   {builder:function(ee){
     return ["Break",ee[0]]}}],
  [["with","(",expr,")",_stat],
   {builder:function(ee){
     return ["With",ee[0],ee[1]]}}],
  [["switch","(",expr,")","{",
    gg.list(
      [gg.seq(
        ["case",expr,":",_stat])]),
    gg.opt(
      gg.seq(
        ["default",":",_stat],
        {builder:function(ee){return ee[0]}})),
    "}"],
   {builder:function(ee){
     return ["Switch",ee[0],
       ee[2],//default branch
       ee[1]]}}],
  [["match","(",expr,")","{",
    gg.list(
      [gg.seq(
        [expr,gg.opt(
          gg.seq(["if","(",expr,")"],
                 {builder:function(ee){
                   return ee[0]}})),
         ":",_stat],
        {builder:function(ee){
          return [ee[0],ee[1],ee[2]]}})]),"}"],
   {builder:function(ee){
     //return ["Match",ee[0],ee[1]]
     return match_builder(
       ["Match",ee[0],ee[1]])}}],
  [["throw",expr],{builder:function(ee){
    return ["Throw",ee[0]]}}],
  [["try","{",
    gg.list([_stat,gg.opt(";")]),
    "}",
    gg.list(
      [gg.seq(
        ["catch","(",id,")","{",
         gg.list([_stat,gg.opt(";")]),"}"])]),
    gg.opt(
      gg.seq(["finally","{",
              gg.list([_stat,gg.opt(";")]),
              "}"]))
   ],{builder:function(ee){
     //FIXME
     return fail}}]])

var stat=gg.choice([
  gg.seq([atomic_stat,gg.opt(";")],{
    builder:function(ee){return ee[0]}}),
  gg.seq(
    [id,":",_stat],
    {builder:function(ee){
      return ["Label",ee[0],ee[1]]}}),
  gg.seq([expr,gg.opt(";")],{
    builder:function(ee){return ee[0]}}),
  gg.seq([";"],{
    builder:function(ee){
      return ["Nop"]}}),
  splice])


