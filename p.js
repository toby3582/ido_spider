var data = []
let pools = document.querySelectorAll(".feature-pool-wrap .pool.pool-bsc")
if (pools.length > 0){
    pools.forEach(pool=>{
        let logo = pool.querySelector(".pool-row .pool-logo").getAttribute("src")
        let poolName = pool.querySelector(".pool-row .pool-name").innerText
        let link = pool.getAttribute("href")
       
        console.log("logo:",logo)
        console.log("poolName:",poolName)
        console.log("link:",link)

    })
}