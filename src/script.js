const cityRequest = $("#citySearchInput");
const searchButton = $("#searchButton");
const cityHistory = $("#cityHistory");
const activeCity = $("activeCityName");
const activeTemp = $("activeCityTemp");
const activeWind = $("activeCityWind");
const activeHumidity = $("#activeCityHumidity");
const forecastList = $("forecast");
let weatherUrl = `api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=10a92e1f728ea533565d449485dd660b`;

// let cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=Miami&limit=5&appid=10a92e1f728ea533565d449485dd660b`;

let testUrl =
  "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=10a92e1f728ea533565d449485dd660b";

// fetch(testUrl).then(function (response) {
//   return response.json();
// });
// .then(function (data) {
//   //looping over the fetch response and inserting the URL of your repos into a list
//   for (var i = 0; i < data.length; i++) {
//     //Create a list element
//     var listItem = document.createElement("li");

//     //Set the text of the list element to the JSON response's .html_url property
//     listItem.textContent = data[i].html_url;

//     //Append the li element to the id associated with the ul element.
//     repoList.appendChild(listItem);
//   }
// });
