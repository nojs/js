
var gg=require("no/gg").gg
var fs=require("fs")
var _=require("no/smoke")

var T=_.Tests,__eql=_.__eql,__assert=_.__assert
var __log=_.__log

var stat=require("../stat")
var lx=require("../lexer")

function get_sample(sn){
  var p=__dirname+"/samples/"+sn+".js"
  var src=fs.readFileSync(p,"utf8")
  return src}

var tt=new T()
var dbg=true

tt.add(
  "some stats",function(){
    var src=get_sample("s01")
    var ls=lx.extract(src)
    var xx=[]
    do{
      var x=stat.parse(ls)
      dbg&&__log(x)
      xx.push(x)
      if(ls.peek()[0]==="Eof"){
        break}
    }while(x && x.v!=="<fail>")
    __assert(__eql(
      xx,
      [["Var",
        [[["Id", "gg"],
          ["Dot",
           ["Call",
            ["Id", "require"],
            [["String", "no/gg"]]],
           ["Id", "gg"]]]]],
       ["Var",
        [[["Id", "lx"],
          ["Call",
           ["Id", "require"],
           [["String", "./lexer"]]]]]],
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
               [["Op", ",",
                 ["Id", "js_array"],
                 ["Id", "arguments"]]]]]]]]]]],
       ["Var",
        [[["Id", "_"],
          ["Call",
           ["Id", "require"],
           [["String", "./expr"]]]],
         [["Id", "expr"],
          ["Dot",
           ["Id", "_"],
           ["Id", "expr"]]]]],
       ["Var",
        [[["Id", "expr_no_top_comma"],
          ["Dot",
           ["Id", "_"],
           ["Id", "expr_no_top_comma"]]]]],
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
                       ["Number", 0]]]]]]]]]]]]]]]]]))})


tt.add(
  "some more stats",function(){
    var src=get_sample("s02")
    var ls=lx.extract(src)
    var xx=[]
    do{
      var x=stat.parse(ls)
      dbg&&__log(x)
      xx.push(x)
      if(ls.peek()[0]==="Eof"){
        break}
    }while(x && x.v!=="<fail>")
    __assert(__eql(
      xx,
      [["Var",
        [[["Id", "a"], null],
         [["Id", "b"], ["Number", 3]],
         [["Id", "c"], ["Number", 5]]]],
       ["Function",
        {"name": null,
         "args": [
           ["Id", "b"],
           ["Id", "c"],
           ["Id", "d"]],
         "body": [
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
            ["Id", "q"]]]}]]))})

tt.add(
  "big scary sample",function(){
    var src=get_sample("s03")
    var ls=lx.extract(src)
    var xx=[]
    do{
      var x=stat.parse(ls)
      dbg&&__log(x)
      xx.push(x)
      if(ls.peek()[0]==="Eof"){
        break}
    }while(x && x.v!=="<fail>")
    
})

tt.run_all(dbg)

