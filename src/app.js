function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let pressureElement = document.querySelector("#pressure");
  let windSpeedElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  pressureElement.innerHTML = `${response.data.temperature.pressure} hPa`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  temperatureElement.innerHTML = Math.round(temperature);
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="image-section-icon">`;
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "6f64aatd0b0oe3cc63e4fb944c32303a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(fahrenheitTemperature)}`;

  document.querySelector("#fahrenheit-scale").classList.remove("turned-off");
  document.querySelector("#celsius-scale").classList.add("turned-off");
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(celsiusTemperature)}`;

  document.querySelector("#celsius-scale").classList.remove("turned-off");
  document.querySelector("#fahrenheit-scale").classList.add("turned-off");
}
let form = document.querySelector("#search-form-input");
form.addEventListener("submit", handleSearchSubmit);

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

searchCity("Oosthuizen");
