const apiKey = "daf6cc4f80b94836d9a3babe0067453e";

const resultElement = document.getElementById("result");
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city");

const fahrenheitToCelsius = (fahrenheit) => {
  return (fahrenheit - 32) * 5/9;
};

const displayWeather = (data) => {
  resultElement.innerHTML = `
    <h2>${data.name}</h2>
    <h4 class="weather">${data.weather[0].main}</h4>
    <h4 class="desc">${data.weather[0].description}</h4>
    <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
    <h1>${data.main.temp} &#176;</h1>
    <div class="temp-container">
        <div>
            <h4 class="title">min</h4>
            <h4 class="temp">${data.main.temp_min}&#176;</h4>
        </div>
        <div>
            <h4 class="title">max</h4>
            <h4 class="temp">${data.main.temp_max}&#176;</h4>
        </div>
    </div>
  `;
};

const handleInvalidCity = () => {
  resultElement.innerHTML = `<h3 class="msg">City not found</h3>`;
};

const getWeather = () => {
  const cityValue = cityInput.value.trim();

  if (cityValue.length === 0) {
    resultElement.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;

  cityInput.value = ""; // Clear the input field

  fetch(apiUrl)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      displayWeather(data);
    })
    .catch(() => {
      handleInvalidCity();
    });
};

searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);
