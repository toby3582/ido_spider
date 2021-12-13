const Nightmare = require('nightmare')
const fs = require("fs");

const nightmare = Nightmare({ 
    width:1366,
    height:968,
    show:true,
    waitTimeout:300000,
    gotoTimeout:300000,
    loadTimeout:300000,
    executionTimeout:300000,
    dock: true,
    openDevTools: {
        mode: "detach"
    }
})

let js = fs.readFileSync("./runjs/finance.js")
let runJs = js.toString()
console.log(runJs)

nightmare
  .goto("https://lz.finance/pad")
//   .type('#search_form_input_homepage', 'github nightmare')
//   .click('#search_button_homepage')
  .wait('.pool-row')
  .evaluate((runJs) => {
      console.log("zhaofei come on",runJs,"===")
      eval(runJs)
  },runJs)
  .end()
  .then(data=>{
      console.log(data)
  })
  .catch(error => {
    console.error('run failed:', error)
  })