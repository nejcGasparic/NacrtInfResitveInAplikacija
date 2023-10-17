var baza = 'nejcGasparic';
var baseUrl = 'https://teaching.lavbic.net/api/OIS/baza/' + baza + '/podatki/';


/**
 * Generator podatkov za novega pacienta, ki bo uporabljal aplikacijo. Pri
 * generiranju podatkov je potrebno najprej kreirati novega pacienta z
 * določenimi osebnimi podatki (ime, priimek in datum rojstva) ter za njega
 * shraniti nekaj podatkov o vitalnih znakih.
 * @param stPacienta zaporedna številka pacienta (1, 2 ali 3)
 * @return ehrId generiranega pacienta
 */
let ehrId;
function generirajPodatke(stPacienta) {
  ehrID = generirajID();
  $.ajax({
    url:baseUrl+"vrni/"+stPacienta,
    type:"GET",
    success: function(podatki){
      var seznam = document.getElementById("preberiPredlogoBolnika");
      var option = document.createElement("OPTION");
      option.innerHTML = podatki["Ime"];
      option.value = podatki.Ime+","+podatki.Priimek+","+podatki["Datum-rojstva"]+","+podatki.Meritve[0]["telesna-temp"]+","+podatki.Meritve[0]["diastolicni-KrvniTlak"]+","+podatki.Meritve[0]["nasicenost-krvi"]+","+stPacienta;
      console.log(podatki)
      seznam.options.add(option);
    },
    error: function(err){
      console.log("Prislo je do napake");
    }
  })
  // TODO: Potrebno implementirati
  return ehrID;
}
var t = [];
$(document).ready(function(){
  var btn = document.getElementById("gumb").addEventListener("click",()=>{
    for(let i = 1;i<=3;i++){
     t.push(generirajPodatke(i));
    }
  });
  $('#preberiPredlogoBolnika').change(function() {
    var podatki = $(this).val().split(",");
    $("#kreirajIme").val(podatki[0]);
    $("#kreirajPriimek").val(podatki[1]);
    $("#kreirajDatumRojstva").val(podatki[2]);
    $("#dodajVitalnoEHR").val(t[podatki[6]-1]);
    $("#dodajVitalnoTelesnaTemperatura").val(podatki[3]);
    $("#dodajVitalnoKrvniTlakDiastolicni").val(podatki[4])
    $("#dodajVitalnoNasicenostKrviSKisikom").val(podatki[5])
  });
  
})
window.onload = ()=>{
  var chart = new CanvasJS.Chart("chartContainer", {
    exportEnabled: true,
    animationEnabled: true,
    title:{
      text: "Grafični prikaz temperature in nasičenosti krvi"
    },
    axisY: {
      title: "Nasičenost krvi s kisikom",
      titleFontColor: "#4F81BC",
      lineColor: "#4F81BC",
      labelFontColor: "#4F81BC",
      tickColor: "#4F81BC",
      includeZero: true
    },
    axisY2: {
      title: "Temperatura",
      titleFontColor: "#C0504E",
      lineColor: "#C0504E",
      labelFontColor: "#C0504E",
      tickColor: "#C0504E",
      includeZero: true
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries
    },
    data: [{
      type: "column",
      yValueFormatString: "#,##%",
      dataPoints: [
        { label: "Pepi",  y: 70 },
        { label: "Primož", y: 99 },
        { label: "Milica", y: 80 },
      ]
    },
    {
      type: "column",
      axisYType: "secondary",
      yValueFormatString: "#,##0.# °C",
      dataPoints: [
        { label: "Pepi", y: 38 },
        { label: "Primož", y: 36.5 },
        { label: "Milica", y:  36.8 },
      ]
    }]
  });
  chart.render();
  
  function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    e.chart.render();
  }
  
}
//console.log(t)
//generirajPodatke()
// TODO: Tukaj implementirate funkcionalnost, ki jo podpira vaša aplikacija

function generirajID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
