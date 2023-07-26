const cityRequest = $("#citySearchInput");
const searchForm = $("#searchForm");
const searchInput = $("#citySearchInput");
const cityHistory = $("#cityHistory");
const activeCity = $("#activeCityName");
const activeTemp = $("#activeCityTemp");
const activeWind = $("#activeCityWind");
const activeHumidity = $("#activeCityHumidity");
const forecastList = $("#forecast");

$(searchForm).on("submit", async (e) => {
  e.preventDefault();
  let cityData = [];
  let searchedCity = $(searchInput).val();
  let cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&limit=5&appid=10a92e1f728ea533565d449485dd660b`;
  await fetch(cityUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      cityData = data;
    });
  // console.log(cityData[0].lat);

  let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${cityData[0].lat}&lon=${cityData[0].lon}&units=imperial&appid=10a92e1f728ea533565d449485dd660b`;

  // Fetches and displays weather of searched city
  await fetch(currentWeatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      $(activeCity).html(`${data.name} (${dayjs().format("MM/D/YYYY")})`);
      $(activeTemp).html(`Temp: ${data.main.temp} &deg;F`);
      $(activeWind).html(`Wind: ${data.wind.speed} MPH`);
      $(activeHumidity).html(`Humidity: ${data.main.humidity} %`);
    });

  let forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${cityData[0].lat}&lon=${cityData[0].lon}&units=imperial&appid=10a92e1f728ea533565d449485dd660b`;
  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let days = [8, 16, 24, 32, 40, 48];
      console.log(data);
    });
});
