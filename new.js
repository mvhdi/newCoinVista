// gets the data from the api, and changes the key for json 
const getDataFromApi = async() => {
  try{
    return await fetch('https://api.coinlore.com/api/tickers/', {mode: 'cors'})
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        let ticker = json.data;
        // change the json key to the name of each coin
        for(i = 0; i < 100; i++){
          ticker[ticker[i]["name"]] = ticker[i];
          delete ticker[i];
        }
        return ticker;
      })    
  }
  catch (err) {
    console.log(err);
  }
}

//merge data from json files, and format it in array
const getFormatedData = async(timePeriod) => { 
  try{
    let ticker = await getDataFromApi();
    // list cointains data from api, and addtional data, it also relabels certain values.
    let list = [];
    for(coin in ticker){
      let algoData = algoMap[coin];
      if (algoData != undefined){
          list.push( 
            { 
                "name": coin, 
                "algorithm": algoData[0], 
                "symbol": ticker[coin]["symbol"],
                "rank" : ticker[coin]["rank"], 
                "market_cap_usd": parseFloat(ticker[coin]["market_cap_usd"]), 
                "24h_volume_usd": parseFloat(ticker[coin]["volume24"]), 
                "max_supply": parseFloat(ticker[coin]["msupply"]), 
                "available_supply": parseFloat(ticker[coin]["tsupply"]), 
                "price_usd": "$"+(ticker[coin]["price_usd"]), 
                "price_btc": "₿"+(ticker[coin]["price_btc"]),  
                "change_1h": (ticker[coin]["percent_change_1h"])+"%",   
                "change_7d": (ticker[coin]["percent_change_7d"])+"%",  
                "change_24h": (ticker[coin]["percent_change_24h"])+"%", 
                "color" : (parseFloat(ticker[coin][timePeriod]) >=0 ) ? "#04873E" : "#B71710",
                "status": (parseFloat(ticker[coin][timePeriod]) >=0 ) ? "Gainer " : "Loser ", 
                "Name":coin+".",        
            }
          );
      } 
    }
    return [list, ticker];
  }
  catch (err){
    console.log(err);
  }
}
// draws out viz
const makeviz = async(timePeriod, blockSizeBy,depthLevel,cat,currency,colorBy, showLegend) => { 
  let bothData = await getFormatedData(timePeriod);
  let list = bothData[0];
  let ticker = bothData[1];
  var currentCoin="level 0"
  var currentDepth = 0;
  console.log(list);
  // draw out vizs
  var coinvista = d3plus.viz().container("#viz").data(list).type({"mode": "squarify"}).id([cat,"name","Name"]).size(blockSizeBy).height(window.innerHeight-5)
    .width(window.innerWidth-5).resize( true ).depth(depthLevel).font({ "size": 20, "spacing": 5, "weight":700, "family":"Avenir Next" }).color(colorBy).legend({"value": showLegend})
    .format({"text": function(text,key){
          // use info in key object to updated the currentDepth and currentCoin the user is looking at
          if(key["vars"] != undefined){
            currentDepth = key["vars"]["depth"]["value"];
            if(key["data"] != undefined){
              // console.log(key["data"]["name"])
              currentCoin = key["data"]["name"];
            }
            // call redraw on mouse movements with the updated currentdepth and currentCoin
              d3.selectAll("#viz").on("mousemove", function(d) {redraw()})
              d3.selectAll("#viz").on("scroll", function(d) {redraw()})
              d3.selectAll("#viz").on("click", function(d) {redraw()})
              d3.selectAll("#viz").on("mouseout", function(d) {redraw()})
            }
            if (ticker[text] != undefined) {
                var format =  d3.format(".3f");
                if(currency == "usd"){
                  var newV =  ticker[text]["name"].toUpperCase()+"  "+parseFloat(ticker[text][timePeriod])+"%"+"\n "+"\n"+ "$"+format(ticker[text]["price_usd"])
                  return newV
                }
                if(currency == "bitcoin"){
                  var newV =  ticker[text]["name"].toUpperCase()+"  "+parseFloat(ticker[text][timePeriod])+"%"+"\n "+"\n"+ "₿"+(ticker[text]["price_btc"])
                  return newV
                }              
            }
            else {
                return text.toUpperCase()
            }
          }
    })
    .labels({"align": "center", "valign": "top", "size": 100, "family": "Helvetica Neue", "spacing": 5, "weight":700 })
    .tooltip({"value": ["Name","market_cap_usd","24h_volume_usd","price_usd", "price_btc" ,"change_1h","change_24h","change_7d", "algorithm"], "background": "rgba(255,255,255,0.97)"})
    .draw()
    // displays coin info deepending on the level of the treemap
    function redraw(){
      var x = document.getElementById("coin_info" );
      if (currentDepth == 2 ) {
        // once I put info for rest 99 coins remove if statement.
        if(currentCoin === "Bitcoin"){
          populateElements(currentCoin);
            console.log("in bitcoin");
            x.style.display = "block";
          }
      } 
      if(currentDepth != 2 ){
          x.style.display = "none";
          document.getElementById('viz').style.height = "93vh"
          window.dispatchEvent(new Event('resize'));
      }
    }
}
// logic for buttons is in util.jss
  var depthLevel=0;      
  var blockSizeBy="market_cap_usd";      
  var cat = "algorithm";     
  var timePeriod = "percent_change_1h";
  var currency = "usd";
  var colorBy = "color";
  var showLegend = false;
  makeviz(timePeriod, blockSizeBy,depthLevel,cat,currency,colorBy, showLegend);







