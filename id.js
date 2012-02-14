

var gg=require("no/gg").gg

var _id={
  parse:function(){
    return id.parse.apply(id,arguments)}}

module.exports=_id

var expr=require("./expr").expr
var splice=require("./meta").splice

var Z=gg.zero()

var id=gg.choice(
  [gg.id,
   splice])



