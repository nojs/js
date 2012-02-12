
var _=require("no/smoke")

var T=_.Tests,__eql=_.__eql,__assert=_.__assert

var _=require("../expr")
var expr=_.expr
var lx=require("../lexer")

var tt=new T()
var dbg=true


tt.add(
  "simple expr",
  function (){
    debugger
    var ls=lx.extract("a+b-c*d")
    var x=expr.parse(ls)
    dbg&&console.dir(x)
    __assert(__eql(
      x,
      ['Op','-',
       ['Op','+',['Id','a'],['Id','b']],
       ['Op','*',['Id','c'],['Id','d']]]))})


tt.run_all(dbg)

