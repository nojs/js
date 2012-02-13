


function make_for(A,B,C,BODY){
  var r=`{
    function(){
      ,{A}
      while(,{B}){
        ,{BODY}
        ,{C}}}}
  return r
}



