
var _=require("no/smoke")
var __assert=_.__assert

function MAP(a,f,o){
  var rr=[]
  for(var i=0,l=a.length;i<l;i++){
    rr.push(f.call(o,a[i],i))}
  return rr}

var uid=0
function gensym(){
  return ["Id","__v"+uid++]}

function build_match(ee){
  var tag=ee[0]
  __assert(tag=="Match")
  var expr=ee[1]
  var pairs=ee[2]
  var X=gensym()
  var ML=gensym()
  var pp=MAP(pairs,function(p,i){
    var pattern=p[0]
    var guard=p[1]
    var stat=p[2]
    var ss=build_cond(pattern,X)
    if(guard){
      ss.push(["If",["Op","!",["Paren",guard]],["Block",[["Break",null]]],null])}
    ss.push(stat)
    ss.push(["Break",ML])
    return ["Do",["Id","false"],["Block",ss]]})
  return ["Block",[["Var",[[X,expr]]],["Label",ML,["Do",["Id","false"],["Block",pp]]]]]}

function build_cond(pattern,X){
  var bound={}
  var cc=[]
  _build_cond(pattern,X)
  return cc
  function _build_cond(pat,X){
    var tag=pat[0]
    if(tag=="Array"){
      var vals=pat[1]
      var loc0=gensym()
      cc.push(["Var",[[loc0,X]]])
      cc.push(["If",["Op","!",["Paren",["Op","==",["Dot",loc0,["Id","length"]],["Number",vals.length]]]],["Block",[["Break",null]]],null])
      MAP(vals,function(v,i){
        _build_cond(v,["Idx",loc0,["Number",i]])})}
    else if(tag=="Id"){
      var id=pat[1]
      if(id=="_"){
        return ["Nop"]}
      if(!(id in bound)){
        bound[id]=true
        cc.push(["Var",[[pat,X]]])}
      else {
        cc.push(["If",["Op","!",["Paren",["Op","==",X,pat]]],["Block",[["Break",null]]],null])}}
    else {
      cc.push(["If",["Op","!",["Paren",["Op","==",X,pat]]],["Block",[["Break",null]]],null])}}}

module.exports={
  build:build_match}

