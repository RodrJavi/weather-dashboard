const cityRequest = $("#citySearchInput");
const searchForm = $("#searchForm");
const searchInput = $("#citySearchInput");
const cityHistory = $("#cityHistory");
const activeCity = $("#activeCityName");
const activeTemp = $("#activeCityTemp");
const activeWind = $("#activeCityWind");
const activeHumidity = $("#activeCityHumidity");
const forecastList = $("#forecast");

$(searchForm).on("submit", (e) => {
  e.preventDefault();
  let searchedCity = $(searchInput).val();
  let cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&limit=5&appid=10a92e1f728ea533565d449485dd660b`;
  let coords = fetch(cityUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // let searchedLat = data[0].lat;
      // let searchedLon = data[0].lon;
      let coordinates = [data[0].lat, data[0].lon];
      return coordinates;
    });

  // return `http://api.openweathermap.org/data/2.5/forecast?lat=${searchedLat}&lon=${searchedLon}&units=imperial&appid=10a92e1f728ea533565d449485dd660b`;
  // weatherUrl.then(function (data) {
  //   fetch(data)
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (data) {
  //       console.log(data);
  //       $(activeCity).text(data.city.name);
  //       $(activeTemp).text(data.list[0].main.temp);
  //       $(activeWind).text(data.list[0].wind.speed);
  //       $(activeHumidity).text(data.list[0].main.humidity);
  //       let days = [8, 16, 24, 32, 40, 48];
  //     });
  // });
  console.log(coords);
});
