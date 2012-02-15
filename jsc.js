
function MAP(a,f,o){
  var rr=[]
  for(var i=0,l=a.length;i<l;i++){
    rr.push(f.call(o,a[i],i))}
  return rr}

var fs=require("fs")

var _=require("no/smoke")
var T=_.Tests,__eql=_.__eql,__assert=_.__assert
var __log=_.__log

var _=require("./stat")
var stat=_.stat,block=_.block

var lx=require("./lexer")
var jsc=require("./compiler")


function parse_opts(aa){
  var opts={}
  var args=[]
  for(var i=0,l=aa.length;i<l;i++){
    if(aa[i][0]==="-"){
      var key=aa[i].slice(1)
      var val=aa[i+1]
      opts[key]=val
      i++}
    else{
      args.push(aa[i])}}
  return [args,opts]}

function compile(args,opts){
  var src=fs.readFileSync(opts.i,"utf8")
  var ls=lx.extract(src)
  var xx=block.parse(ls)
  var ss=MAP(xx,function(x){
    return jsc.compile(x)})
  fs.writeFileSync(opts.o,ss.join("\n")+"\n",
                   "utf8")}


function main(){
  try{
    var oo=parse_opts(process.argv.slice(2))
    if(!oo[1].i||!oo[1].o){
      console.log("Usage: node jsc.js -i <input> -o <output>")
      process.exit(1)}
    compile(oo[0],oo[1])
  }catch(e){
    console.log(e.stack)
    process.exit(127)}}

main()

