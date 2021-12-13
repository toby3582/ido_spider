function getData(){
    var data = []
    let pools = document.querySelectorAll(".feature-pool-wrap .pool.pool-bsc")
    if (pools.length > 0){
        pools.forEach(pool=>{
            let logo = pool.querySelector(".pool-row .pool-logo").getAttribute("src")
            let poolName = pool.querySelector(".pool-row .pool-name").innerText
            let link = pool.getAttribute("href")
            if(link.indexOf("pad/pool") > -1){
                data.push({
                    logo:logo,
                    poolName:poolName,
                    viewUrl:"https://lz.finance/"+link
                }) 
            }         
        })
        console.log(data)
    }

    return data
}

function getContent(){
    let tokenName = document.querySelector("#pools-detail > div.pool-details-wrap > div:nth-child(3) > div:nth-child(2) > span:nth-child(2)").innerText
    let statusVal = document.querySelector("body > div > div.content > div > div > div.pool-header-wrap > div > div.pool-header-right > div.pool-time > h4").innerText
    let title  = document.querySelector("body > div > div.content > div > div > div.pool-header-wrap > div > div.pool-header-left > div.pool-name > div").innerText
    let price = document.querySelector("#pools-detail > div.pool-details-wrap > div:nth-child(1) > div:nth-child(6) > span:nth-child(2)").innerText
    let logo = document.querySelector("body > div > div.content > div > div > div.pool-header-wrap > div > div.pool-header-left > img").getAttribute("src")
    let desc = document.querySelector("#project-information").innerText
    let total_sold_coin = document.querySelector("#pools-detail > div.pool-details-wrap > div:nth-child(3) > div:nth-child(4) > span:nth-child(2)").innerText
    let website = document.querySelector("#pools-detail > div.pool-details-wrap > div:nth-child(3) > div:nth-child(6) > a").innerText
    let white_paper = document.querySelector("#pools-detail > div.pool-details-wrap > div:nth-child(3) > div:nth-child(7) > a").innerText
    let policy = document.querySelector("#pools-detail > div.pool-details-wrap > div:nth-child(1) > div:nth-child(4) > span:nth-child(2)").innerText
    let saled_coin = document.querySelector("body > div > div.content > div > div > div.pool-header-wrap > div > div.pool-header-right > div.pool-amount.text-linear").innerText
    var data ={
        token : tokenName, // Token
        status : statusVal, // Status Upcoming,Register,Ended
        title : title, // Title
        price : price, // IDO Price
        swap_token : 'BUSD', // Swap For Token
        url : window.location.href, // Source URL
        icon :logo, // LOGO
        desc : desc, // Desc
        'station' : 'finance', // IDO Station ID
        'total_coin' : total_sold_coin, // Total Coin will be sale
        'saled_coin' : saled_coin, // Saled Coin
        'ido_chain' : strtoupper($d['network_available']), // IDO Chain
        'dis_chain' : strtoupper($d['network_available']), // Distribution Chain
        'pre_start' : $d['start_pre_order_time']??0, // Pre Sale Start time
        'sale_start' : $d['start_time'], // Sale Start time
        'sale_end' : $d['finish_time'], // Sale End time
        'reg_start' : $d['start_join_pool_time'], // Registration Start time
        'reg_end' : $d['end_join_pool_time'], // Registration End time
        'fcfs_opens' : $d['release_time'], // FCFS Opens time
        'access' : $d['is_private']==1 ? 'Private' : ($d['is_private']==2?'Seed':'Public'), // Access Type
        'website' : website,
        'white_paper' : white_paper, // White paper
        'community' : {
            "Twitter":"https://twitter.com/HeroFiio"
        },// Community
        'policy' : policy, // Vesting
        'source':'finance',
        'source_id' : 0, //
    }
    console.log(data)
    return data
}