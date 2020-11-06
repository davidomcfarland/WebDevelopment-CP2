let typeSubmission = document.getElementById("type");
let partSubmission = document.getElementById("participantsInput");
let pricSubmission = document.getElementById("priceInput");
let submitButton   = document.getElementById("submit");

let results = document.getElementById("results");

let URL = "http://www.boredapi.com/api/activity";

submitButton.addEventListener("click", function(event) {
  event.preventDefault();

  let typeInput = typeSubmission.value;
  let partInput = partSubmission.value;
  let pricInput = pricSubmission.value/100;

  let query = "";
  let queryList = [];

  let typeQuery;
  let partQuery;
  let pricQuery;

  if (typeof eval(partInput) != "number" && typeInput == ""){
    results.innerHTML = "please enter a valid number";
    return;
  }

  if (typeInput != "Pick an Option"){
    typeQuery = "type=" + typeInput;
    queryList.push(typeQuery)
  }
  else {
      typeQuery = "";
      queryList.push(typeQuery);
    }

  if (pricInput<=0.05) {
    pricQuery = "price=0";
    queryList.push(pricQuery);
  }
  else if (pricInput>=0.95) {
    pricQuery = "price=1";
    queryList.push(pricQuery);
  }
  else {
      let range = - Math.abs(pricInput - 0.5) + 0.5;

      let min = pricInput - range;
      let max = pricInput + range;

      pricQuery = "minprice=" + min + "&maxprice=" + max;

      queryList.push(pricQuery);
  }

  if (partInput != ""){
    let partQuery = "participants=" + partInput;
    queryList.push(partQuery);
  }

  if (queryList.length == 0) {
    return
  }
  else if ( queryList.length == 1) {
    query = queryList[0];
  }
  else {
    query = queryList[0]
    for (i=1; i<queryList.length; i++){
      query += "&" + queryList[i];
    }
  }

  let typeURL = URL + "?" + query;

  var responseJSON = fetch(typeURL).then(
    function(response){
        return response.json()
    }
  ).then(
    function(json) {

      results.querySelector("#activity").innerHTML = json.activity;
      results.querySelector("#accessibility").innerHTML = json.accessibility;
      results.querySelector("#type").innerHTML = json.type;
      results.querySelector("#participants").innerHTML = json.participants;
      results.querySelector("#price").innerHTML = json.price;


    }
  )
}

);

let formHidden = true;

let showHideForm = document.getElementById("ShowHideForm");
let advancedForm = document.getElementById("advancedSearchForm");

showHideForm.addEventListener("click",
  function(event) {

    let advanced = document.getElementsByClassName("advanced");

    if (formHidden) {
      for (i=0; i<advanced.length; i++) {
        advanced[i].style.display = "inline-block";
      }

      formHidden = false;
    }
    else {
      for (i=0; i<advanced.length; i++) {
        advanced[i].style.display = "none";
      }

      formHidden = true;
    }
  }
)
