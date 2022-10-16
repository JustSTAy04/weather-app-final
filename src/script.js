let apiKey = "46460ff7f6bd748e52ea94a2797a58ce";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&units=metric&appid=${apiKey}`;

let city = document.querySelector("#cityName");
let currentTemp = document.querySelector("#currentTemp");
let desc = document.querySelector("#desc");
let humid = document.querySelector("#humid");
let wind = document.querySelector("#wind");

function displayTemp(response) {
  console.log(response.data);
  city.innerHTML = response.data.name;
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  desc.innerHTML = response.data.weather[0].description;
  humid.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
}

axios.get(apiUrl).then(displayTemp);
