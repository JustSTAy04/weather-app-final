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
}

let apiKey = "46460ff7f6bd748e52ea94a2797a58ce";
function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
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
