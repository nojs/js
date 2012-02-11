
var gg=require("no/gg").gg
var lx=require("./lexer")

var expr=require("./expr")

var js_stat=gg.choice([
  gg.mseq([
    [["while"]],
    [["for"]],
    [["if"]],
    [["do"]],
    [["return"]],
    [["continue"]],
    [["break"]],
  ])
])

module.exports=js_stat
