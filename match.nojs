

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
      ss.push(
        `{if(!(,{guard})){
          break}})}
    ss.push(stat)
    ss.push(`{break ,{ML}})
    return `{do
      ,{["Block",ss]}
       while(false)}})
  return `{
    var ,{X}=,{expr}
    ,{ML}:do ,{
      ["Block",pp]
    }while(false)}}

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
      cc.push(
        `{var ,{loc0}=,{X}})
      cc.push(
        `{if(!(,{loc0}.length==,{["Number",vals.length]})){
          break}})
      MAP(vals,function(v,i){
        _build_cond(
          v,`{,{loc0}[,{["Number",i]}]})})}
    else if(tag=="Id"){
      var id=pat[1]
      if(id=="_"){
        return ["Nop"]}
      if(!(id in bound)){
        bound[id]=true
        cc.push(
          `{var ,{pat}=,{X}})}
      else{
        cc.push(
          `{if(!(,{X}==,{pat})){break}})}}
    else{
      cc.push(
        `{if(!(,{X}==,{pat})){break}})}}}



module.exports={
  build:build_match
}


