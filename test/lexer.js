
var _=require("no/smoke")

var T=_.Tests,__eql=_.__eql,__assert=_.__assert

var lx=require("../lexer")

var tt=new T()
var dbg=true

tt.add(
  "simple lexer",function(){

    var ls=lx.extract("var a;var b;var c=3;")
    dbg&&console.log(ls.tokens)
    __assert(__eql(
      ls.tokens,
      [ [ 'Keyword', 'var', 0 ],
        [ 'Id', 'a', 0 ],
        [ 'Keyword', ';', 0 ],
        [ 'Keyword', 'var', 0 ],
        [ 'Id', 'b', 0 ],
        [ 'Keyword', ';', 0 ],
        [ 'Keyword', 'var', 0 ],
        [ 'Id', 'c', 0 ],
        [ 'Keyword', '=', 0 ],
        [ 'Number', 3, 0 ],
        [ 'Keyword', ';', 0 ],
        [ 'Eof', 'eof', 0 ] ]))
  }
)


tt.run_all(dbg)
