
var lx=require("no/gg").lx

var js_lx=new lx()

js_lx.add([
  "break","case","catch","continue","default","delete","do",
  "else","finally","for","function","if","in","instanceof",
  "new","return","switch",
  //"this",
  "throw","try","typeof",
  "var","void","while","with"])


js_lx.add([
  "abstract","boolean","byte","char","class","const","debugger","double",
  "enum","export","extends","final","float","goto","implements","import",
  "int","interface","long","native","package","private","protected","public",
  "short","static","super","synchronized","throws","transient","volatile"])


js_lx.add([
  "++","--",
  //"!","~","+","-",
  //"*","/","%",
  ">>","<<",">>>",
  //"<",">",
  "<=",">=",
  "==","!=","===","!==",
  //"&","^","|",
  "&&","||",
  "=","+=","-=","*=","/=","%=","<<=",">>=",">>>=",
  "&=","^=","|="
])

js_lx.add([
  "`{",",{","match"
])

module.exports=js_lx
