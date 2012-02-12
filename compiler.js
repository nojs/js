

function compile(ee){
  var tag=ee[0]
  var C=compile_table[tag]
  return C(ee)}

function compile_op(ee){
  var tag=ee[0]
  var op=ee[1]
  var C=op_compile_table[op]
  return C.compile.apply(C,ee.slice(2))}

function fop2(op){
  return function(e1,e2){
    return [compile(e1),op,compile(e2)]}}
function fop1p(op){
  return function(e){
    return [op,compile(e)]}}
function fop1s(op){
  return function(e){
    return [compile(e),op]}}

var op_compile_table={
  //prefix
  "New":fop1p("new"),
  "++X":fop1p("++"),
  "--X":fop1p("--"),
  "!":fop1p("!"),
  "~":fop1p("~"),
  "+X":fop1p("+"),
  "-X":fop1p("-"),
  "typeof":fop1p("typeof"),
  "void":fop1p("void"),
  "delete":fop1p("delete"),
  //infix
  "*":fop2("*"),
  "/":fop2("/"),
  "%":fop2("%"),
  "+":fop2("+"),
  "-":fop2("-"),
  ">>":fop2(">>"),
  "<<":fop2("<<"),
  ">>>":fop2(">>>"),
  ">":fop2(">"),
  "<":fop2("<"),
  "<=":fop2("<="),
  ">=":fop2(">="),
  "in":fop2("in"),
  "instanceof":fop2("instanceof"),
  "==":fop2("=="),
  "!=":fop2("!="),
  "===":fop2("==="),
  "!==":fop2("!=="),
  "&":fop2("&"),
  "^":fop2("^"),
  "|":fop2("|"),
  "&&":fop2("&&"),
  "||":fop2("||"),
  "=":fop2("="),
  "+=":fop2("+="),
  "-=":fop2("-="),
  "*=":fop2("*="),
  "/=":fop2("/="),
  "%=":fop2("%="),
  "<<=":fop2("<<="),
  ">>=":fop2(">>="),
  ">>>=":fop2(">>>="),
  "&=":fop2("&="),
  "^=":fop2("^="),
  "|=":fop2("|="),
  ",":fop2(","),
  //suffix
  "X++":fop1s("++"),
  "X--":fop1s("--")}

var compile_table={
  Function:function(ee){
    var tag=ee[0]
    var name=ee[1]
    var args=ee[2]
    var body=ee[3]
    __assert(tag==="Function")
    var xx=[
      "function",name||"","(",MAP(args,function(a){return a[1]}),")","{\n",
      MAP(body,function(s){
        return compile(s)}),"}"]
    return xx.join("")},
  
  While:function(ee){
    var tag=ee[0]
    var cond=ee[1]
    var stat=ee[2]
    __assert(tag==="While")
    var xx=[
      "while","(",compile(cond),")",compile(stat)]
    return xx.join("")},
  
  Do:function(ee){
    var tag=ee[0]
    var cond=ee[1]
    var stat=ee[2]
    var xx=[
      "do","{",
      compile(stat),
      "}","while","(",compile(cond),")"]
    return xx.join("")}
  
  For:function(ee){
    var tag=ee[0]
    var header=ee[1]
    var stat=ee[2]
    var xx=[
      compile(header),
      conpile(stat)]
    return xx.join("")},

  For_num:function(ee){
    var tag=ee[0]
    __assert(tag==="For_num")
    var init=ee[1]
    var cond=ee[2]
    var incr=ee[3]
    var xx=[
      "for","(",
      compile(init),";",
      compile(cond),";",
      compile(incr),")"]
    return xx.join("")},
  
  For_in:function(ee){
    var tag=ee[0]
    __assert(tag==="For_in")
    var key=ee[1]
    var expr=ee[2]
    var xx=[
      "for","(",compile(key),"in",compile(expr),")"]
    return xx.join("")},
  
  Block:function(ee){
    var tag=ee[0]
    __assert(tag==="Block")
    var stats=ee[1]
    var xx=["{",MAP(stats,function(s){return compile(s)}),"}"]
    return xx.join("")},

  If:function(ee){
    var tag=ee[0]
    __assert(tag==="If")
    var cond=ee[1]
    var stat=ee[2]
    var elstat=ee[3]
    var xx=[
      "if","(",compile(cond),")",
      compile(stat)]
    return xx.join("")},

  Cond:function(ee){
    var tag=ee[0]
    __assert(tag==="Cond")
    var cond=ee[1]
    var expr=ee[2]
    var elsexpr=ee[3]
    var xx=[
      compile(cond),"?",
      compile(expr),":",
      compile(elsexpr)]
    return xx.join("")},
  
  Switch:function(ee){
    var tag=ee[0]
    __assert(tag==="Switch")
    throw ["not implemented"]},
  
  Try:function(ee){
    var tag=ee[0]
    __assert(tag==="Try")
    var block=ee[1]
    var catches=ee[2]
    var finblock=ee[3]
    throw ["not impolemented"]}

  Return:function(ee){
    var tag=ee[0]
    __assert(tag==="Return")
    var expr=ee[1]
    var xx=[
      "return",
      expr?compile(expr):""]
    return expr.join("")},
  
  Throw:function(ee){
    var tag=ee[0]
    __assert(tag==="Throw")
    var expr=ee[1]
    var xx=[
      "throw",
      compile(expr)]
    return xx.join("")},
  
  Continue:function(ee){
    var tag=ee[0]
    __assert(tag==="Continue")
    var label=ee[1]
    var xx=[
      "continue",
      label?compile(label):""]},
  
  Break:function(ee){
    var tag=ee[0]
    __assert(tag==="Continue")
    var label=ee[1]
    var xx=[
      "break",
      label?compile(label):""]
    return xx.join("")},
  
  Label:function(ee){
    var tag=ee[0]
    __assert(tag==="Label")
    var id=ee[1]
    var stat=ee[2]
    var xx=[
      compile(id),":"
      compile(stat)]
    return xx.join("")},

  Paren:function(ee){
    var tag=ee[0]
    __assert(tag==="Paren")
    var expr=ee[1]
    var xx=[
      "(",compile(expr),")"]
    return xx.join("")},
  
  Op:function(ee){
    var tag=ee[0]
    __assert(tag==="Op")
    return compile_op(ee)},
  
  Dot:function(ee){
    var tag=ee[0]
    __assert(tag==="Dot")
    var expr=ee[1]
    var id=ee[2]
    var xx=[
      compile(expr),".",
      compile(id)]
    return xx.join("")}
  
  Idx:function(ee){
    var tag=ee[0]
    __assert(tag==="Idx")
    var expr=ee[1]
    var idx=ee[2]
    var xx=[
      compile(expr),
      "[",compile(idx),"]"]
    return xx.join("")},
  
  Call:function(ee){
    var tag=ee[0]
    __assert(tag==="Call")
    var expr=ee[0]
    var args=ee[1]
    //FIXME: add commas to arguments
    var xx=[
      compile(expr),"(",
      MAP(args,function(arg){
        return compile(arg)}),
      ")"]
    return xx.join("")},

  Array:function(ee){
    var tag=ee[0]
    __assert(tag==="Array")
    var elts=ee[1]
    //FIXME: add commas to elts
    var xx=[
      "[",
      MAP(elts,function(e){
        return compile(e)})
      "]"]
    return xx.join("")},
  
  Object:function(ee){
    var tag=ee[0]
    __assert(tag==="Object")
    var pairs=ee[1]
    var xx=[
      "{",
      MAP(pairs,function(p){
        return compile(p)}),
      "}"]
    return xx.join("")},

  Pair:function(ee){
    var tag=ee[0]
    __assert(tag==="Pair")
    var key=ee[1]
    var val=ee[2]
    var xx=[
      compile(key),":",
      compile(val)]
    return xx.join("")}

  Var:function(ee){
    var tag=ee[0]
    __assert(tag==="Var")
    var decls=ee[1]
    //FIXME: add commas to docls
    var xx=[
      "var",
      MAP(decls,function(d){
        var id=d[0]
        var val=d[1]
        return [compile(id),"=",
          compile(val)]})]
    return xx.join("")}}


