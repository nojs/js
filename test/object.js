
var _=require("no/smoke")

var T=_.Tests,__eql=_.__eql,__assert=_.__assert
var __log=_.__log

var object=require("../object")
var lx=require("../lexer")

var tt=new T()
var dbg=true

tt.add(
  "simple object",function(){
    var ls=lx.extract('{a:"b","c":def,e:3+2}')
    var x=object.parse(ls)
    dbg&&__log(x)
    __assert(__eql(
      x,
      ["Object",
       [["Pair",
         ["Id", "a"],
         ["String", "b"]],
        ["Pair",
         ["String", "c"],
         ["Id", "def"]],
        ["Pair",
         ["Id", "e"],
         ["Op", "+",
          ["Number", 3],
          ["Number", 2]]]]]))})

tt.add(
  "simple commaless object",function(){
    var ls=lx.extract('{a:"b" "c":def e:3+2}')
    var x=object.parse(ls)
    dbg&&__log(x)
    __assert(__eql(
      x,
      ["Object",
       [["Pair",
         ["Id", "a"],
         ["String", "b"]],
        ["Pair",
         ["String", "c"],
         ["Id", "def"]],
        ["Pair",
         ["Id", "e"],
         ["Op", "+",
          ["Number", 3],
          ["Number", 2]]]]]))})

tt.run_all(dbg)

