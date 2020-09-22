// GOAL: To create a weather app where users can enter in a city and the 5 day forecast is shown
//
// When user opens page:
// MUST HAVE:
//      -   left sidebar: has the search function and cities previously looked up
//      -   centre: is blank
// SHOULD HAVE:
// COULD HAVE:
//      -   right sidebar: has wildcard options (e.g. search random tropical place)
//      -   right sidebar: has a search by country option
// WONT HAVE:
//
// When user searches
// MUST HAVE:
//      -   left sidebar: seacrhed city added to history
//      -   centre: 5 day forecast of seacrhed city is shown
// SHOULD HAVE:
// COULD HAVE:
//      -   centre: background image changes based on city (photo of country or current weather)
// WONT HAVE:

// var button = document.querySelector('.button');
// var inputValue = document.querySelector('.inputValue');
// var name = document.querySelector('.name')
// var desc = document.querySelector('.desc')
// var temp = document.querySelector('.temp')

// button.addEventListener('click',function() {
//     fetch ('https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=' + inputValue +'&appid=fd40ccd7b40508e5a2e810c079536a1d')
//     .then(response => response.json())
//     .then(data => console.log)

//     .catch(err => alert("invalid city"))
// })

// HEADER date time and current location
const todayDate = $("#todayDate");
const rightNow = $("#rightNow");
const now = moment();
const date = now.format("DD MMMM YYYY");
const time = now.format("h:mm a");
todayDate.html(date);
rightNow.html(time);

// LEFT PANEL
// Search button listener
// DOM ELEMENTS
let cityArray = [];
let currentArray = localStorage.getItem("cityArray");
if (localStorage.getItem("cityArray") !== null) {
  cityArray = currentArray.split(",");
}

// CREATE HISTORY BUTONS
if (localStorage.getItem("cityArray") !== null) {
  console.log("array exists");
  renderPreviousButtons();
}

function renderPreviousButtons() {
  $("#previous").empty();
  for (var i = 0; i < cityArray.length; i++) {
    var a = $("<button>");
    a.addClass("previousCity");
    a.attr("data-name", cityArray[i]);
    a.text(cityArray[i]);
    $("#previous").prepend(a);
  }
}

// LISTENERS AND CLICKS
let cityName = document.getElementById("cityName");
let futureSection = document.getElementById("future");
cityName.addEventListener("keyup", () => {
  search.disabled = !cityName.value;
});

// LISTENERS AND CLICKS: SEARCH FUNCTION
$("#search").on("click", function (event) {
  let cityName = document.getElementById("cityName").value;
  console.log("New City: " + cityName);
  cityArray.push([cityName]);
  localStorage.setItem("cityArray", cityArray);
  document.getElementById("cityName").value = "";
  sendAPI(cityName);
  renderPreviousButtons();
});

// LISTENERS AND CLICKS: SELECT FROM PREVIOUS SEARCH
$(document).on("click", ".previousCity", function (event) {
  let cityName = $(this).text().trim();
  console.log("Previous city clicked: " + cityName);
  sendAPI(cityName);
});

// API FUNCTION
function sendAPI(city) {
  // API DATA
  const apiUrlToday =
    "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=";

  const apiUrlFuture =
    "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=";
  const apiKey = "&appid=fd40ccd7b40508e5a2e810c079536a1d";
  const unit = "&units=metric";
  const unitStymbol = "°C";
  // let name = cityName.value
  let queryURLToday = apiUrlToday + city + unit + apiKey;

  let queryURLFuture = apiUrlFuture + city + unit + apiKey;
  console.log(queryURLToday);
  console.log(queryURLFuture);

  //  TODAY'S AJAX
  $.ajax({
    url: queryURLToday,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // Weather conditions for Today
    var tempToday = response.main.temp;
    var humToday = response.main.humidity;
    var descToday = response.weather[0].description;
    var windToday = response.wind.speed;
    var name = response.name;
    var country = response.sys.country;
    var coord = "lat=" + response.coord.lat + "&lon=" + response.coord.lon;
    console.log(coord);
    // if (country === "CO"){
    //   document.getElementById("todayView").addClass("tropical");
    }

    const apiUrlUv =
      "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/uvi/forecast?"; //lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
    let queryURLuv = apiUrlUv + coord + "&cnt=6" + apiKey;

    // UV INDEX AJAX
    $.ajax({
      url: queryURLuv,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      var uvToday = response[0].value;
      console.log(uvToday);
      //   INSERT TODAY'S DATA INTO DOCUMENT
      $("#name").text(name + ", " + country);
      $("#descToday").text("Currently: " + descToday);
      $("#windToday").text("Wind Speed: " + windToday + "m/s");
      $("#humToday").text("Humidity: " + humToday + "%");
      $("#tempToday").text("Temperature: " + tempToday + unitStymbol);
      $("#uvToday").text("UV index: " + uvToday);

    });

    //  FIVE DAY AJAX
    $.ajax({
      url: queryURLFuture,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      let futureResults = response.list;
      let futureForcast = [];
      for (let index = 0; index < futureResults.length; index++) {
        const isEigth = (index + 1) % 8 === 0;
        if (isEigth) {
          futureForcast.push(futureResults[index]);
        }
      }
      console.log(futureForcast);

      for (let index = 0; index < futureForcast.length; index++) {
        const weatherData = futureForcast[index];
        console.log("data ", weatherData);

        var tempFuture = weatherData["main"].temp;
        var humFuture = weatherData["main"].humidity;
        var descFuture = weatherData["weather"]["0"].description;
        var windFuture = weatherData["wind"].speed;
        var name = weatherData;
        var dateFuture = weatherData.dt_txt;
        console.log(
          "temp: " + tempFuture,
          "humidity: " + humFuture,
          "description: " + descFuture,
          "wind: " + windFuture,
          "dt_txt: " + dateFuture
        );

        // create the element
        // $("#future").empty();
        // const card = $("<div>");
        //   // card.addClass("futureCard");
        //   // card.text("City: ");
        // futureSection.appendChild(card);

        $("#future").empty();
        // const card = $("<div>");
        //   // card.addClass("futureCard");
        //   // card.text("City: ");
        // futureSection.appendChild(card);

        // const card = document.createElement('div'); // is a node
        // card.innerHTML = 'test';
        // $("#future").appendChild(card);

        // const futureDetails = $('<p> Forcast: Wind: Humidity: Temperature: UV Index: </p>');
        //   card.append(futureDetails);
        //   console.log("booya")

        // document.createElement("div");
        // const card = $('<div class="futureCard">');
        // const futureDetails = $('<p> Forcast: Wind: Humidity: ' + humFuture + ' Temperature: UV Index: </p>');
        // card.append(futureDetails);

        // card.addClass("futureCard");
        // card.text("test");

        // // Add data
        // card.addClass("futureCard");
        // card.text("City: " + name);
        // card.text("Date: " + name);
        // card.text("Forecast: " + name);
        // card.text("Temp: " + name);
        // card.text("City: " + name);

        // card.text("Forecast: " + windFuture);

        //
        // $("#future").prepend(card);
        // debugger
        //
      }
    }); //Closing 5 day AJAX
  }); // closing Todays AJAX
}
