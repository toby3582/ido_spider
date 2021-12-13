const config = require('config');
const Nightmare = require('nightmare')
const fs = require("fs");

let nightConfig = config.get("NightmareConfig")

const nightmare = Nightmare({ 
    width:1366,
    height:968,
    show:true,
    waitTimeout:30000,
    gotoTimeout:30000,
    // loadTimeout:300000,
    // executionTimeout:3000,
    dock: true,
    openDevTools: {
        mode: "detach"
    }
})

async function runSpider() {
    let IDO = config.get('IDO');
    console.log("---------ido spider beigin---------\r\n")
    if (IDO.length <= 0) {
        console.log("---------config error ido length eq 0---------\r\n")
        process.exit()
    }

    for (key in IDO) {
        let item = IDO[key]
        console.log("---------site = ---------", item.site, "\r\n")
        let idourl = item.site + item.path
        console.log("---------url = ---------", idourl, "\r\n")
        console.log("---------rule = ---------", item.rule, "\r\n")
        let data = await spider(idourl, item.rule)
        console.log("spdata=",data)

        if(item.view == true && data.length >0 ){
            for (index in data){
                let result = await spiderView(data[index].viewUrl, item.rule)
            } 
        }
    }
}

function spider(url, rule) {
    let js = fs.readFileSync("./runjs/"+rule.runJs)
    runJs = js.toString()
    // console.log(runJs)
    let ng = nightmare.goto(url)
    if(rule.click){
        ng.click(rule.click)
    }
    if(rule.waitSelector){
        ng.wait(rule.waitSelector)
    }
    return ng.evaluate((runJs) => {
        console.log("join page")
        console.log(runJs)
        eval(runJs)
        return getData()
        

    },runJs)
    .end()
    .then((data)=>{
        // console.log(data)
        return data
    })
    .catch(error => {
        console.log("run error",error)
    })

}

//对于需要二级页面的
function spiderView(url, rule) {
    let js = fs.readFileSync("./runjs/"+rule.runJs)
    runJs = js.toString()
    // console.log(runJs)
    let ng = nightmare.goto(url)
    if(rule.view.click){
        ng.click(rule.view.click)
    }
    if(rule.view.waitSelector){
        ng.wait(rule.view.waitSelector)
    }
    return ng.evaluate((runJs) => {
        console.log("join page")
        console.log(runJs)
        eval(runJs)
        return getContent()
    },runJs)
    .end()
    .then((data)=>{
        // console.log(data)
        return data
    })
    .catch(error => {
        console.log("run error",error)
    })

}


runSpider()


// process.exit()
