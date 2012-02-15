
function MAP(a,f,o){
  var rr=[]
  for(var i=0,l=a.length;i<l;i++){
    rr.push(f.call(o,a[i],i))}
  return rr}

var gg=require("no/gg").gg
var fs=require("fs")
var _=require("no/smoke")

var T=_.Tests,__eql=_.__eql,__assert=_.__assert
var __log=_.__log

var _=require("../stat")
var stat=_.stat,block=_.block
var lx=require("../lexer")
var jsc=require("../compiler")

function get_sample(sn){
  var p=__dirname+"/samples/"+sn+".js"
  var src=fs.readFileSync(p,"utf8")
  return src}

var tt=new T()
var dbg=true

false && tt.add(
  "simple quote",function(){
    var s=jsc.quote(
      ["Var",
        [[["Id", "gg"],
          ["Dot",
           ["Call",
            ["Id", "require"],
            [["String", "no/gg"]]],
           ["Id", "gg"]]]]])
    console.log(s)
})

false && tt.add(
  "simple quote 1",function(){
    var src="var a=`{a+,{b}}"
    var ls=lx.extract(src)
    var x=stat.parse(ls)
    dbg&&__log(x)
    var s=jsc.compile(x)
    console.log(s)
})


false && tt.add(
  "simple meta compile",function(){
    var src=
      "function make_for(A,B,C,BODY){\n"+
      "  var q=`{var ,{A}= a+b}\n"+
      "  return r\n"+
      "}\n"
    
    console.log(src)
    var ls=lx.extract(src)
    var x=stat.parse(ls)
    dbg && __log(x)
    var s=jsc.compile(x)
    dbg && console.log(s)
    __assert(__eql(
    s,
      'function make_for(A,B,C,BODY){\n'+
        'var q=["Var",[[A,["Op","+",["Id","a"],["Id","b"]]]]]\n'+
        'return r}'))})

false && tt.add(
  "simple meta compile 1",function(){
    var src=get_sample("meta01")
      
    console.log(src)
    var ls=lx.extract(src)
    var x=stat.parse(ls)
    __log(x)
    var s=jsc.compile(x)
    console.log(s)
})

tt.add(
  "simple meta compile 2",function(){
    var src=get_sample("match")
      
    console.log(src)
    var ls=lx.extract(src)
    //__log(ls.tokens)
    var xx=block.parse(ls)
    __log(xx)
    MAP(xx,function(x){
      var s=jsc.compile(x)
      console.log(s)})
    
})


false && tt.add(
  "simple compile 4",function(){
    var src=get_sample("s01")
    var ls=lx.extract(src)
    var xx=[]
    var s=jsc.compile(
      ["Op", "=",
       ["Dot",
        ["Id", "module"],
        ["Id", "exports"]],
       ["Object",
        [["Pair",
          ["Id", "parse"],
          ["Function", null,
           [],
           [["Return",
             ["Call",
              ["Dot",
               ["Dot",
                ["Id", "js_array"],
                ["Id", "parse"]],
               ["Id", "apply"]],
              [["Id", "js_array"],
               ["Id", "arguments"]]]]]]]]]])
    console.log(s)})

false && tt.add(
  "simple compile 5",function(){
    var src=get_sample("s01")
    var ls=lx.extract(src)
    var xx=[]
    var s=jsc.compile(
      ["Var",
       [[["Id", "js_array"],
         ["Call",
          ["Dot",
           ["Id", "gg"],
           ["Id", "seq"]],
          [["Op", ",",
            ["Array",
             [["String", "["],
              ["Call",
               ["Dot",
                ["Id", "gg"],
                ["Id", "list"]],
               [["Array",
                 [["Id", "expr_no_top_comma"],
                  ["String", ","]]]]],
              ["String", "]"]]],
            ["Object",
             [["Pair",
               ["Id", "builder"],
               ["Function", null,
                [["Id", "ee"]],
                [
                  ["Return",
                   ["Array",
                    [["String", "Array"],
                     ["Idx",
                      ["Id", "ee"],
                      ["Number", 0]]]]]]]]]]]]]]]])
    console.log(s)})


false && tt.add(
  "simple compile 6",function(){
    var src=get_sample("s01")
    var ls=lx.extract(src)
    var xx=[]
    var s=jsc.compile(
      ["Function",null,
       [["Id", "b"],
        ["Id", "c"],
        ["Id", "d"]],
       [
          ["For",
           ["For_num",
            ["Var",
             [[["Id", "a"],
               ["Number", 3]]]],
            ["Op", "<",
             ["Number", 3],
             ["Number", 4]],
            ["Op", "X++",
             ["Id", "i"]]],
           ["Block",
            [["Call",
              ["Id", "do_somth"],
              []]]]],
          ["For",
           ["For_in",
            ["Id", "a"],
            ["Id", "k"]],
           ["Block",
            [["Call",
              ["Id", "do_else"],
              []]]]],
          ["For",
           ["For_in",
            ["Id", "q"],
            ["Id", "q"]],
           ["Block",
            [["Call",
              ["Id", "do_more"],
              []]]]],
          ["Return",
           ["Id", "q"]]]])
    console.log(s)})


tt.run_all(dbg)


