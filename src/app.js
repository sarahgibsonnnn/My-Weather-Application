let fahrenheightToggle = document.querySelector("#fahrenheit-link");
let celciusToggle = document.querySelector("#celcius-link");
let currentButton = document.querySelector(".current");
let displayTemp = document.querySelector(".current-temp");
let displayPrecipitation = document.querySelector("#precipitation");
let displayWindSpeed = document.querySelector("#wind-speed");
let displayWindDirection = document.querySelector("#wind-direction");
let displayWeatherDescription = document.querySelector("#current-weather-description");
let displayWeatherIcon = document.querySelector("#current-weather-icon");
let currentUnits = "Celcius";
let apiKey = "d039aea9f001c8513436c79fb9e6958c";
let currTime = new Date();
let currDay = currTime.getDay();
let formDateTime = document.querySelector("#current-date-time");
let forecastDay1 = document.querySelector("#forecast-day1");
let forecastDay2 = document.querySelector("#forecast-day2");
let forecastDay3 = document.querySelector("#forecast-day3");
let forecastDay4 = document.querySelector("#forecast-day4");

celciusToggle.style.fontWeight = "bold";

function getDayOfWeek (day) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return days[day];
}

function getCurrentDayTime () {
  let hour = currTime.getHours();
  let minute = currTime.getMinutes();
  let dayOfWeek = getDayOfWeek(currDay);

  formDateTime.innerHTML = `${dayOfWeek} ${hour}:${minute}`;
}
function getIcon(id, element) {
  let iconClass = element.className;
  let iconColor = element.style.color;
  let background = "";

  switch (true) {
    case id > 800:
      iconClass = "fas fa-cloud";
      iconColor = "grey";
      background = "https://images2.minutemediacdn.com/image/upload/c_crop,h_1193,w_2121,x_0,y_221/f_auto,q_auto,w_1100/v1555155296/shape/mentalfloss/iStock-104472907.jpg"
      break;
    case id === 800:
      iconClass = "fas fa-sun";
      iconColor = "yellow";
      background = "data:image/jpeg;base64,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"
      break;
    case id >= 700:
      iconClass = "fas fa-smog";
      iconColor = "lightgrey";
      background = "https://videohive.img.customer.envatousercontent.com/files/230388355/Fog_590x300.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=637464f985de48365d1330cc9474efb7"
      break;
    case id >= 600:
      iconClass = "fas fa-snowflake";
      iconColor = "blue";
      background = ""
      break;
    case id >= 500:
      iconClass = "fas fa-cloud-showers-heavy";
      iconColor = "rgb(67, 67, 133)";
      background = ""
      break;
    case id >= 300:
      iconClass = "fas fa-cloud-rain";
      iconColor = "rgb(67, 67, 133)";
      background = ""
      break;
    case id >= 200:
      iconClass = "fas fa-bolt";
      iconColor = "yellow";
      background = ""
      break;
  }
  
  element.className = iconClass + " forecast-icon";
  element.style.color = iconColor;
}

function showCity(response) {
  let location = response.data.name;
  let header = document.querySelector(".current-loc");
  header.innerHTML = location;
}
function showCurrentWeather(response) {
//find temperature

  let temperature = Math.round(response.data.current.temp);
  displayTemp.innerHTML = temperature;
//find windspeed and wind direction 
  let windSpeed = Math.round(response.data.current.wind_speed);
  let windDirection = response.data.current.wind_deg;
  displayWindSpeed.innerHTML = `${windSpeed} mph`;
  displayWindDirection.style.transform = `rotate(${windDirection}deg)`;
//find precipitation
  let precipitation = Math.round(response.data.daily[0].pop *100);
  displayPrecipitation.innerHTML = `${precipitation} %`;

//find weather description
  let weatherDesc = response.data.current.weather[0].main;
  displayWeatherDescription.innerHTML = weatherDesc;

//set icon from description ID

  let weatherDescID = response.data.current.weather[0].id;

  getIcon(weatherDescID,displayWeatherIcon)

}

function showForecast (response) {
//day 0
console.log(response);
  function getForecastTemp(day) {
    return Math.round(response.data.daily[day].temp.day)
  }
  function getWeatherDesc(day) {
    return response.data.daily[day].weather[0].main
  }
  function getWeatherDescID(day) {
   console.log(response);
   return response.data.daily[day].weather[0].id
    
  }
  function updateForecastHTML(day,dayOfWeek,temp,desc,iconID) {
    let forecastTemp = document.querySelector(`#forecast-day${day}-temp`);
     forecastTemp.innerHTML = `${temp} °C`;
    let dayHTML = document.querySelector(`#forecast-day${day}`);
    dayHTML.innerHTML = dayOfWeek;
    let icon = document.querySelector(`#forecast-day${day}-icon`);
    let forecastDescription = document.querySelector(`#forecast-day${day}-description`)
    forecastDescription.innerHTML = desc;
    getIcon(iconID,icon)
   
 }
  let forecast = [
    {
      dayNumber: 0,
      dayOfWeek: getDayOfWeek(currDay),
      temp: getForecastTemp(currDay),
      desc: getWeatherDesc(currDay),
      iconID: getWeatherDescID(currDay),
    },
    {
      dayNumber: 1,
      dayOfWeek: getDayOfWeek(currDay + 1),
      temp: getForecastTemp(currDay + 1),
      desc: getWeatherDesc(currDay + 1),
      iconID: getWeatherDescID(currDay + 1),
    },
    {
      dayNumber: 2,
      dayOfWeek: getDayOfWeek(currDay + 2),
      temp: getForecastTemp(currDay + 2),
      desc: getWeatherDesc(currDay + 2),
      iconID: getWeatherDescID(currDay + 2),
    },
    {
      dayNumber: 3,
      dayOfWeek: getDayOfWeek(currDay + 3),
      temp: getForecastTemp(currDay + 3),
      desc: getWeatherDesc(currDay + 3),
      iconID: getWeatherDescID(currDay + 3),
    },
    {
      dayNumber: 4,
      dayOfWeek: getDayOfWeek(currDay + 4),
      temp: getForecastTemp(currDay + 4),
      desc: getWeatherDesc(currDay + 4),
      iconID: getWeatherDescID(currDay + 4),
    }
  ]
forecast.forEach(Element => {
  updateForecastHTML(Element.dayNumber, Element.dayOfWeek, Element.temp,Element.desc,Element.iconID)
});
   // forecastDay0.innerHTML = day0;
 
  let day1 = getDayOfWeek(currDay + 1);
  forecastDay1.innerHTML = day1;
  let forecastDay1Temp = document.querySelector("#forecast-day1-temp");
  forecastDay1Temp.innerHTML = `${forecast[1].temp} °C`;
  //day 2
  let day2 = getDayOfWeek(currDay + 2);
  forecastDay2.innerHTML = day2;
  let forecastDay2Temp = document.querySelector("#forecast-day2-temp");
  forecastDay2Temp.innerHTML = `${forecast[2].temp} °C`;
  //day 3
  let day3 = getDayOfWeek(currDay + 3);
  forecastDay3.innerHTML = day3;
  let forecastDay3Temp = document.querySelector("#forecast-day3-temp");
  forecastDay3Temp.innerHTML = `${forecast[3].temp} °C`;
  //day 4
  let day4 = getDayOfWeek(currDay + 4);
  forecastDay4.innerHTML = day4;
  let forecastDay4Temp = document.querySelector("#forecast-day4-temp");
  forecastDay4Temp.innerHTML = `${forecast[4].temp} °C`;
}

function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
  let cityAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(cityAPIURL).then(showCity);
  let callAPI = axios.get(apiURL)

  callAPI.then(showCurrentWeather);
  callAPI.then(showForecast);
}


function getCurrent() {
  navigator.geolocation.getCurrentPosition(getLocation);
  getCurrentDayTime()
}

getCurrent()


currentButton.addEventListener("click", getCurrent);



let searchForm = document.querySelector("#search-form");

function findCoordinates(response) {
  let latitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
  let callAPI = axios.get(apiURL)
  callAPI.then(showCurrentWeather);
  callAPI.then(showForecast);

}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  let heading = document.querySelector(".current-loc");
  let searchApiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(searchApiURL).then(findCoordinates);
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
