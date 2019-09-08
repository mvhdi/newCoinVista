function populateElements(currentCoin){

      document.getElementById("coin_name").innerHTML=currentCoin;
      document.getElementById("coin_intro").innerHTML=algoMap[currentCoin][10];
      document.getElementById("coin_site").href=algoMap[currentCoin][6];
      document.getElementById("coin_github").href=algoMap[currentCoin][8];
      document.getElementById("coin_whitepaper").href=algoMap[currentCoin][5];
      document.getElementById("coin_reddit").href=algoMap[currentCoin][13];
      document.getElementById("coin_twitter").href=algoMap[currentCoin][7];
      document.getElementById("coin_wiki").href=algoMap[currentCoin][9];
      // document.getElementById("coin_explorer").href=algoMap[currentCoin][11];
      // document.getElementById("coin_founders").innerHTML=algoMap[currentCoin][3];
      // document.getElementById("coin_lang").innerHTML=algoMap[currentCoin][2];
      // document.getElementById("coin_algo").innerHTML=algoMap[currentCoin][0];
      // document.getElementById("coin_proof").innerHTML=algoMap[currentCoin][14];
      // document.getElementById("coin_mine").innerHTML=algoMap[currentCoin][15];
      // document.getElementById("coin_type").innerHTML=algoMap[currentCoin][12];
      // document.getElementById("myFrame").src=algoMap[currentCoin][1];
      // document.getElementById("pb_1").innerHTML=algoMap[currentCoin][16][0];
      // document.getElementById("pb_2").innerHTML=algoMap[currentCoin][16][1];
      // document.getElementById("tech_1").innerHTML=algoMap[currentCoin][17][0];
      // document.getElementById("tech_2").innerHTML=algoMap[currentCoin][17][1];
      // document.getElementById("tech_3").innerHTML=algoMap[currentCoin][17][2];
      // document.getElementById("distributionn").innerHTML=algoMap[currentCoin][18][0];
      // document.getElementById("supplyy").innerHTML=algoMap[currentCoin][19][0];
      //   document.getElementById('viz').style.height = "15vh"
      //   window.dispatchEvent(new Event('resize'));
}


// button functions 
function updateViz(){
  d3.selectAll("#viz").selectAll("div").remove();
      makeviz(timePeriod, blockSizeBy,depthLevel,cat,currency,colorBy, showLegend);
      reViz();

};

function updateView() {
  var value = document.getElementById("viewSelect").value;
  if (value == "1"){
      depthLevel=1;
  };
     if (value == "2"){
      depthLevel=0;
   }; 
   updateViz();
};

function reViz(){
    window.dispatchEvent(new Event('resize'));
}
function updateCat() {
  var value = document.getElementById("catSelect").value;
  if (value == "5"){
      cat = "algorithm";
  };
     if (value == "6"){
      cat = "status";
   }; 
   updateViz();
};

function updateBlock() {
  var value = document.getElementById("blockSelect").value;
  if (value == "3"){
      blockSizeBy="market_cap_usd";
  };
     if (value == "4"){
      blockSizeBy="24h_volume_usd";
   }; 
   updateViz();
};

function updateTime() {
  var value = document.getElementById("timeSelect").value;
  if (value == "7"){
      timePeriod = 8;
  };
     if (value == "8"){
      timePeriod = 10;
   }; 
     if (value == "99"){
      timePeriod = 9;
   };
   updateViz();
};

function updateMoney() {
  var value = document.getElementById("moneySelect").value;
  if (value == "100"){
      currency = "usd";
  };
     if (value == "101"){
      currency = "bitcoin";
   }; 
   updateViz();
};

function updateColor() {
  var value = document.getElementById("colorSelect").value;
  if (value == "102"){
      colorBy = "color";
      showLegend = false;
  };
     if (value == "103"){
      colorBy = "market_cap_usd";
      showLegend = true;
   };
  if (value == "104"){
      colorBy = "24h_volume_usd";
      showLegend = true;
  };
     if (value == "105"){
      colorBy = "max_supply";
      showLegend = true;
   }; 
     if (value == "106"){
      colorBy = "available_supply";
      showLegend = true;
   }; 
   updateViz();
};