// set variables

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
let background = "";
let allTemperatures = document.querySelectorAll(".temp-value");
let allUnits = document.querySelectorAll(".units");

celciusToggle.style.fontWeight = "bold";
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}
console.log(currTime.addDays(1))

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
  return days[day.getDay()];
}

function getCurrentDayTime () {
  let hour = currTime.getHours();
  let minute = currTime.getMinutes();
  if (minute <10) {
    minute = `0${minute}`
  };
  let dayOfWeek = getDayOfWeek(currTime);

  formDateTime.innerHTML = `${dayOfWeek} ${hour}:${minute}`;
}
function getIcon(id, element) {
  let iconClass = element.className;
  let iconColor = element.style.color;
  

  switch (true) {
    case id > 800:
      iconClass = "fas fa-cloud";
      iconColor = "grey";
      background = "url('https://img.freepik.com/free-photo/black-rain-abstract-dark-power_1127-2380.jpg?size=626&ext=jpg')"
      break;
    case id === 800:
      iconClass = "fas fa-sun";
      iconColor = "rgb(255, 197, 88)";
      background = "url('https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')"
      break;
    case id >= 700:
      iconClass = "fas fa-smog";
      iconColor = "lightgrey";
      background = "url('https://image.freepik.com/free-photo/grayscale-shot-pathway-with-foggy-background_181624-17211.jpg')"
      break;
    case id >= 600:
      iconClass = "fas fa-snowflake";
      iconColor = "blue";
      background = "url('https://images-na.ssl-images-amazon.com/images/I/710SKl7-r2L._AC_SL1008_.jpg'"
      break;
    case id >= 500:
      iconClass = "fas fa-cloud-showers-heavy";
      iconColor = "rgb(67, 67, 133)";
      background = "url('https://cdn.wallpapersafari.com/94/54/06WzD9.jpg')"
      break;
    case id >= 300:
      iconClass = "fas fa-cloud-rain";
      iconColor = "rgb(67, 67, 133)";
      background = "url('https://images.all-free-download.com/images/graphiclarge/light_rain_rain_cloud_235453.jpg')"
      break;
    case id >= 200:
      iconClass = "fas fa-bolt";
      iconColor = "yellow";
      background = "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e96ef228-4b92-40dd-ba72-9ffadba55a24/d6ri8pf-c526ca8b-2b35-4f85-9ba7-125ba2e4ce9f.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZTk2ZWYyMjgtNGI5Mi00MGRkLWJhNzItOWZmYWRiYTU1YTI0XC9kNnJpOHBmLWM1MjZjYThiLTJiMzUtNGY4NS05YmE3LTEyNWJhMmU0Y2U5Zi5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.hiuCX9yHPLIYvjdAkeOX0URkmX0yusR_LadpmuCOlvY')"
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

  document.querySelector("body").style.backgroundImage = background ;
}

function showForecast (response) {
//day 0

  function getForecastTemp(day) {
    return Math.round(response.data.daily[day].temp.day)
  }
  function getWeatherDesc(day) {
    return response.data.daily[day].weather[0].main
  }
  function getWeatherDescID(day) {
   
   return response.data.daily[day].weather[0].id
    
  }
  function updateForecastHTML(day,dayOfWeek,temp,desc,iconID) {
    let forecastTemp = document.querySelector(`#forecast-day${day}-temp`);
     forecastTemp.innerHTML = temp;
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
      dayOfWeek: getDayOfWeek(currTime),
      temp: getForecastTemp(currDay),
      desc: getWeatherDesc(currDay),
      iconID: getWeatherDescID(currDay),
    },
    {
      dayNumber: 1,
      dayOfWeek: getDayOfWeek(currTime.addDays(1)),
      temp: getForecastTemp(currDay + 1),
      desc: getWeatherDesc(currDay + 1),
      iconID: getWeatherDescID(currDay + 1),
    },
    {
      dayNumber: 2,
      dayOfWeek: getDayOfWeek(currTime.addDays(2)),
      temp: getForecastTemp(currDay + 2),
      desc: getWeatherDesc(currDay + 2),
      iconID: getWeatherDescID(currDay + 2),
    },
    {
      dayNumber: 3,
      dayOfWeek: getDayOfWeek(currTime.addDays(3)),
      temp: getForecastTemp(currDay + 3),
      desc: getWeatherDesc(currDay + 3),
      iconID: getWeatherDescID(currDay + 3),
    },
    {
      dayNumber: 4,
      dayOfWeek: getDayOfWeek(currTime.addDays(4)),
      temp: getForecastTemp(currDay + 4),
      desc: getWeatherDesc(currDay + 4),
      iconID: getWeatherDescID(currDay + 4),
    }
  ]

forecast.forEach(Element => {
  updateForecastHTML(Element.dayNumber, Element.dayOfWeek, Element.temp,Element.desc,Element.iconID)
});
   // forecastDay0.innerHTML = day0;
 
  let day1 = getDayOfWeek(currTime.addDays(1));
  forecastDay1.innerHTML = day1;
  let forecastDay1Temp = document.querySelector("#forecast-day1-temp");
  forecastDay1Temp.innerHTML = forecast[1].temp;
  //day 2
  let day2 = getDayOfWeek(currTime.addDays(2));
  forecastDay2.innerHTML = day2;
  let forecastDay2Temp = document.querySelector("#forecast-day2-temp");
  forecastDay2Temp.innerHTML = forecast[2].temp
  //day 3
  let day3 = getDayOfWeek(currTime.addDays(3));
  forecastDay3.innerHTML = day3;
  let forecastDay3Temp = document.querySelector("#forecast-day3-temp");
  forecastDay3Temp.innerHTML = forecast[3].temp;
  //day 4
  let day4 = getDayOfWeek(currTime.addDays(4));
  forecastDay4.innerHTML = day4;
  let forecastDay4Temp = document.querySelector("#forecast-day4-temp");
  forecastDay4Temp.innerHTML = forecast[4].temp;
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
  document.querySelector("body").style.backgroundImage = background ;
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
    allTemperatures.forEach(Element => {
      Element.innerHTML = Math.round(Element.innerHTML * (9/5) + 32)
    });
    let units = " °F";
    allUnits.forEach(Element => {
       Element.innerHTML = units;
    });
    currentUnits = "Fahrenheit"
    fahrenheightToggle.style.fontWeight = "bold"
    celciusToggle.style.fontWeight = "normal"
  }  
}

function showCelcius() {
  if (currentUnits === "Fahrenheit") {
    allTemperatures.forEach(Element => {
      Element.innerHTML = Math.round((Element.innerHTML -32) * (5/9))
    });
    let units = " °C";
    allUnits.forEach(Element => {
       Element.innerHTML = units;
    });
    currentUnits = "Celcius"
    fahrenheightToggle.style.fontWeight = "normal"
    celciusToggle.style.fontWeight = "bold"
  }  
}
let units = " °C";
    allUnits.forEach(Element => {
       Element.innerHTML = units;
    });
fahrenheightToggle.addEventListener("click", showFahrenheit);
celciusToggle.addEventListener("click", showCelcius);
