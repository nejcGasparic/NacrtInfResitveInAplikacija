let podatki;
let stNovihOkuzb;
let incidenca;
let stUmrlih;
let stTrenutnih;
let dan;
let mesec;
let request = new XMLHttpRequest();
request.open("GET","https://api.sledilnik.org/api/summary");
request.send();
request.onload = ()=>{
  //console.log(request)
  if(request.status == 200)
    //console.log(JSON.parse(request.response));
    podatki = JSON.parse(request.response);
}
request.addEventListener('load',()=>{
  //console.log(podatki)
  dan = podatki["casesActive"].day;
  mesec = podatki["casesActive"].month;
  stUmrlih = podatki["deceasedToDate"].value;
  incidenca = (podatki["casesAvg7Days"].value).toFixed(1);
  stTrenutnih = podatki["casesActive"].value;
  stNovihOkuzb = podatki["testsToday"]["subValues"].positive;
  document.querySelector("#stNovoOkuzenih").innerHTML += stNovihOkuzb;
  document.querySelector("#incidenca").innerHTML += incidenca;
  document.querySelector("#stTrenutnih").innerHTML += stTrenutnih;
  document.querySelector("#stUmrlih").innerHTML += stUmrlih;
  document.querySelector(".date-time").innerHTML += dan +"."+mesec+ " 2021";
})
//console.log()