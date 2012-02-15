
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

var stat=require("../stat").stat
var lx=require("../lexer")
var jsc=require("../compiler")

function get_sample(sn){
  var p=__dirname+"/samples/"+sn+".js"
  var src=fs.readFileSync(p,"utf8")
  return src}

var tt=new T()
var dbg=true

tt.add(
  "simple match",function(){

    var src="match(x){\n"+
      " 1:{smth1()}\n"+
      " [a,[a]] if(a<3):{something(a*2)}\n"+
      " [a,b] :{smthelse(a+b)}\n"+
      " [1,_]:{do_default()}}"

    var ls=lx.extract(src)
    var x=stat.parse(ls)
    __log(x)
    var s=jsc.compile(x)
    console.log(s)
    

})


tt.run_all(dbg)


