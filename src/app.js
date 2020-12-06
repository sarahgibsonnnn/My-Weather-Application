let fahrenheightToggle = document.querySelector("#fahrenheit-link");
let celciusToggle = document.querySelector("#celcius-link");
let displayTemp = document.querySelector(".current-temp");
let displayPrecipitation = document.querySelector("#precipitation");
let displayWindSpeed = document.querySelector("#wind-speed");
let displayWindDirection = document.querySelector("#wind-direction");
let currentUnits = "Celcius";

celciusToggle.style.fontWeight = "bold";

function showCurrentWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(response);
  let location = response.data.name;
  let header = document.querySelector(".current-loc");
  header.innerHTML = location;
  displayTemp.innerHTML = temperature;
  let windSpeed = Math.round(response.data.wind.speed);
  let windDirection = response.data.wind.deg;
  displayWindSpeed.innerHTML = `${windSpeed} mph`;
  displayWindDirection.style.transform = `rotate(${windDirection}deg)`
}

function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "d039aea9f001c8513436c79fb9e6958c";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showCurrentWeather);
}

let currentButton = document.querySelector(".current");

function getCurrent() {
  navigator.geolocation.getCurrentPosition(getLocation);
}

getCurrent()

currentButton.addEventListener("click", getCurrent);

let currTime = new Date();
let formDateTime = document.querySelector("#current-date-time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let dayOfWeek = days[currTime.getDay()];
let hour = currTime.getHours();
let minute = currTime.getMinutes();

formDateTime.innerHTML = `${dayOfWeek} ${hour}:${minute}`;

let searchForm = document.querySelector("#search-form");

function showSearchWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  displayTemp.innerHTML = temperature;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  let heading = document.querySelector(".current-loc");
  let apiKey = "d039aea9f001c8513436c79fb9e6958c";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(city);
  axios.get(apiURL).then(showSearchWeather);
  heading.innerHTML = city;
}

searchForm.addEventListener("submit", searchCity);

function showFahrenheit() {
  if (currentUnits === "Celcius") {
    displayTemp.innerHTML = Math.round(displayTemp.innerHTML * (9/5) + 32);
    currentUnits = "Fahrenheit"
    fahrenheightToggle.style.fontWeight = "bold"
    celciusToggle.style.fontWeight = "normal"
  }  
}

function showCelcius() {
  if (currentUnits === "Fahrenheit") {
    displayTemp.innerHTML = Math.round((displayTemp.innerHTML -32) * (5/9));
    currentUnits = "Celcius"
    fahrenheightToggle.style.fontWeight = "normal"
    celciusToggle.style.fontWeight = "bold"
  }  
}

fahrenheightToggle.addEventListener("click", showFahrenheit);
celciusToggle.addEventListener("click", showCelcius);
