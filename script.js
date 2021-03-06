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
currentArray = localStorage.getItem("cityArray");
cityArray = currentArray;


// CREATE HISTORY BUTONS
if (localStorage.getItem("cityArray") !== null) {
    console.log("array exists");
    renderButtons();
  }

function renderButtons() {
    $("#previous").empty();
    for (var i = 0; i < cityArray.length; i++) {
        var a = $("<button>");
        a.addClass("previousCity");
        a.attr("data-name", cityArray[i]);
        a.text(cityArray[i]);
        $("#previous").prepend(a);
        }
};

// LISTENER
cityName.addEventListener("keyup", () => {
    search.disabled = !cityName.value;
});

document.getElementById("search").addEventListener("click", function() {
    console.log("Hello World");
    cityName = document.getElementById("cityName").value;
    localStorage.setItem("City", cityName);
    cityArray.push([cityName]);
    localStorage.setItem("cityArray", cityArray);
    sendAPI()
    console.log("Hello World");
    renderButtons()
  });

function sendAPI() {
// API DATA
const apiUrlToday = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q="
const apiUrlFuture = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q="
const apiKey = "&appid=fd40ccd7b40508e5a2e810c079536a1d"
const unit = "&units=metric"
const unitStymbol = "°C"
let queryURLToday = apiUrlToday + cityName + unit + apiKey
let queryURLFuture = apiUrlFuture + cityName + unit + apiKey
console.log(queryURLToday);
console.log(queryURLFuture);

//  Current day forecast AJAX
$.ajax({
    url: queryURLToday, 
    method: "GET"
  }).then(function(response) {
    console.log(response);
    // Weather conditions for Today
      var tempToday = response.main.temp;
      var humToday = response.main.humidity;
      var descToday = response.weather[0].main;
      var windToday = response.wind.speed;
      var name = response.name;
      var country = response.sys.country;
    //   INSERT DATA
      $("#name").text(name + ", " + country);
      $("#descToday").text("Currently: " + descToday);
      $("#windToday").text("Wind Speed: " + windToday + "m/s");
      $("#humToday").text("Humidity: " + humToday);
      $("#tempToday").text("Temperature: " + tempToday + unitStymbol);  
 });

//  Four day forecast AJAX
 $.ajax({
    url: queryURLFuture,
    method: "GET"
  }).then(function(response) {
    console.log(response);

})
}
