const cityRequest = $("#citySearchInput");
const searchForm = $("#searchForm");
const searchInput = $("#citySearchInput");
const cityHistory = $("#cityHistory");
const activeCity = $("#activeCityName");
const activeIcon = $("#activeCityIcon");
const activeTemp = $("#activeCityTemp");
const activeWind = $("#activeCityWind");
const activeHumidity = $("#activeCityHumidity");
const forecastList = $("#forecast");
let history = JSON.parse(localStorage.getItem("cityHistory"));

function updateHistoryList() {
  if (history) {
    $(cityHistory).html("");
    for (let i = 0; i < history.length; i++) {
      let cityLi = $("<li>");
      let cityLiButton = $("<button>");
      cityLiButton.text(history[i]);
      cityLiButton.addClass("border border-2 p-2 w-100");
      cityLiButton.on("click", (e) => {
        searchAndDisplay(e, history[i]);
      });
      cityLi.append(cityLiButton);
      $(cityHistory).append(cityLi);
    }
  }
}
updateHistoryList();

async function searchAndDisplay(event, cityName) {
  event.preventDefault();
  let cityData = [];
  let searchedCity;
  if (!cityName) {
    searchedCity = $(searchInput).val();
  } else {
    searchedCity = cityName;
  }
  let cityUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&limit=5&appid=10a92e1f728ea533565d449485dd660b`;

  await fetch(cityUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      cityData = data;
    });

  if (cityData[0] == undefined) {
    $(activeCity).text("Please search for a valid city");
    $(activeCity).addClass("text-danger");
  } else {
    $(activeCity).removeClass("text-danger");
    let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${cityData[0].lat}&lon=${cityData[0].lon}&units=imperial&appid=10a92e1f728ea533565d449485dd660b`;

    if (!history) {
      history = [searchedCity];
    } else if (history.includes(searchedCity)) {
    } else {
      history.push(searchedCity);
    }

    localStorage.setItem("cityHistory", JSON.stringify(history));
    updateHistoryList();

    // Fetches and displays weather of searched city
    await fetch(currentWeatherUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        $(activeCity).html(`${data.name} (${dayjs().format("MM/D/YYYY")})`);
        $(activeIcon).attr(
          "src",
          `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        );
        $(activeTemp).html(`Temp: ${data.main.temp} &deg;F`);
        $(activeWind).html(`Wind: ${data.wind.speed} MPH`);
        $(activeHumidity).html(`Humidity: ${data.main.humidity} %`);
      });

    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityData[0].lat}&lon=${cityData[0].lon}&units=imperial&appid=10a92e1f728ea533565d449485dd660b`;
    fetch(forecastUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        let futureDayCount = 0;
        $(forecastList).html("");
        for (let i = 1; i < 39; i += 8) {
          futureDayCount += 1;
          let dayLi = $("<li>");
          let dateSpan = $("<span>");
          let iconImg = $("<img>");
          let tempSpan = $("<span>");
          let windSpan = $("<span>");
          let humiditySpan = $("<span>");
          dateSpan.text(dayjs().add(futureDayCount, "day").format("MM/D/YYYY"));
          iconImg.attr(
            "src",
            `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`
          );
          iconImg.attr("height", "40px");
          iconImg.attr("width", "40px");
          tempSpan.html(`Temp: ${data.list[i].main.temp} &deg;F`);
          windSpan.html(`Wind: ${data.list[i].wind.speed} MPH`);
          humiditySpan.html(`Humidity: ${data.list[i].main.humidity} %`);
          dateSpan.addClass("fw-bold");
          dayLi.append(dateSpan);
          dayLi.append(iconImg);
          dayLi.append(tempSpan);
          dayLi.append(windSpan);
          dayLi.append(humiditySpan);
          dayLi.addClass("d-flex flex-column p-3 bg-info text-white gap-2");
          $(forecastList).append(dayLi);
        }
      });
  }
}

$(searchForm).on("submit", (e) => {
  searchAndDisplay(e);
});
