
var _=require("no/smoke")

var T=_.Tests,__eql=_.__eql,__assert=_.__assert
var __log=_.__log

var array=require("../array")
var lx=require("../lexer")

var tt=new T()
var dbg=true

tt.add(
  "simple array",function(){
    var ls=lx.extract("[1,(2,4),3,4,a,b,c]")
    var x=array.parse(ls)
    dbg&&__log(x)
    __assert(__eql(
      x,
      ["Array",
       [["Number", 1],
        ["Paren",
         ["Op", ",",
          ["Number", 2],
          ["Number", 4]]],
        ["Number", 3],
        ["Number", 4],
        ["Id", "a"],
        ["Id", "b"],
        ["Id", "c"]]]))})


tt.add(
  "simple commaless array",function(){
    var ls=lx.extract("[1,(2,4) 3 4 a b c]")
    var x=array.parse(ls)
    dbg&&__log(x)
    __assert(__eql(
      x,
      ["Array",
       [["Number", 1],
        ["Paren",
         ["Op", ",",
          ["Number", 2],
          ["Number", 4]]],
        ["Number", 3],
        ["Number", 4],
        ["Id", "a"],
        ["Id", "b"],
        ["Id", "c"]]]))})




tt.run_all(dbg)
