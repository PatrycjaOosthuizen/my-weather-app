function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");

  celsiusTemperature = response.data.temperature.current;
  cityElement.innerHTML = response.data.city;

  temperatureElement.innerHTML = Math.round(temperature);
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

searchCity("London");
