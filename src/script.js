let city = document.querySelector("#cityName");
let currentTemp = document.querySelector("#currentTemp");
let desc = document.querySelector("#desc");
let humid = document.querySelector("#humid");
let wind = document.querySelector("#wind");
let currentDay = document.querySelector("#day");
let time = document.querySelector("#time");
let otherDays = document.querySelectorAll("#dayOfWeek");
let icon = document.querySelector("#icon");
let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let pos = document.querySelector("#position");
let maxTemp = document.querySelectorAll("#maxTemp");
let minTemp = document.querySelectorAll("#minTemp");
let dailyIcons = document.querySelectorAll("#iconDaily");

function addZero(elem) {
  if (elem < 10) {
    return `0${elem}`;
  } else {
    return elem;
  }
}

function formatDate() {
  let date = new Date();
  let hours = date.getHours();
  let mins = date.getMinutes();
  let dayOfWeek = date.getDay();
  let day = date.getDate();
  let month = date.getMonth();
  time.innerHTML = `${addZero(hours)}:${addZero(mins)}`;
  currentDay.innerHTML = `${addZero(day)}/${addZero(month + 1)}, ${
    daysOfWeek[dayOfWeek]
  }`;

  let count = 0;
  for (let i = 0; i < otherDays.length; i++) {
    if (dayOfWeek + i + 1 < 7) {
      otherDays[i].innerHTML = `${daysOfWeek[date.getDay() + i]}`;
    } else {
      otherDays[i].innerHTML = `${daysOfWeek[count]}`;
      count++;
    }
  }
}

let apiKey = "d92ec26b5d961ff43d6691f4593cf8e3";
function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
}

function displayTemp(response) {
  console.log(response.data);
  city.innerHTML = response.data.name;
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  desc.innerHTML = response.data.weather[0].description;
  humid.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].main);
  formatDate();
  getForecast(response.data.coord);
}

function displayForecast(response) {
  console.log(response);
  for (let i = 0; i < 5; i++) {
    maxTemp[i].innerHTML = `${Math.round(response.data.daily[i].temp.max)}°C`;
    minTemp[i].innerHTML = `${Math.round(response.data.daily[i].temp.min)}°C`;
    dailyIcons[i].setAttribute("alt", response.data.daily[i].weather[0].main);
    dailyIcons[i].setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.daily[i].weather[0].icon}@2x.png`
    );
  }
}

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput");
  search(cityInput.value);
}

search("New York");

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);
pos.addEventListener("click", currentLocation);
