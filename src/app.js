let currTime = new Date();
let formDateTime = document.querySelector("#current-date-time");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday","Friday","Saturday"];
let dayOfWeek = days[currTime.getDay()];
let hour = currTime.getHours();
let minute = currTime.getMinutes();

formDateTime.innerHTML = `${dayOfWeek} ${hour}:${minute}`


let searchForm = document.querySelector("#search-form"); 

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  let heading = document.querySelector(".current-loc");
  heading.innerHTML = input.value;
}
searchForm.addEventListener("submit", searchCity);

let fahrenheightToggle = document.querySelector("#fahrenheit-link");
let celciusToggle = document.querySelector("#celcius-link");
let displayTemp = document.querySelector(".current-temp");

function showFahrenheit (){
  displayTemp.innerHTML = "66";
}

function showCelcius () {
  displayTemp.innerHTML = "19"
}

fahrenheightToggle.addEventListener("click", showFahrenheit);
celciusToggle.addEventListener("click", showCelcius);
