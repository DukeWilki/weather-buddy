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
let currentArray = localStorage.getItem("cityArray");
let cityArray = [currentArray];

// console.log("hello");

// LISTENER
cityName.addEventListener("keyup", () => {
    search.disabled = !cityName.value;
});

function searchCityBtn(){
    var city = document.getElementById("cityName").value;
    localStorage.setItem("City", city);
    cityArray.push(city);
    localStorage.setItem("cityArray", cityArray);
    console.log(cityArray);
    console.log(city);
    sendAPI()
    renderButtons()



// API DATA
function sendAPI() {
const apiUrl = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q="
const apiKey = "&appid=fd40ccd7b40508e5a2e810c079536a1d"
const unit = "&units=metric"
const unitStymbol = "°C"
let queryURL = apiUrl + city + unit + apiKey
console.log(queryURL);
  


$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    // Weather conditions for Today
    var tempToday = response.main.temp;
    var humToday = response.main.humidity;
    var descToday = response.weather[0].main;
    var windToday = response.wind.speed;
    var name = response.sys.country;
    var country = response.name;
    $(".name").text(JSON.stringify(country + ", " + name));
    $("#descToday").text(JSON.stringify("Currently: " + descToday));
    $("#windToday").text(JSON.stringify("Wind Speed: " + windToday + "m/s"));
    $("#humToday").text(JSON.stringify("Humidity: " + humToday));
    $("#tempToday").text(JSON.stringify("Temperature: " + tempToday + unitStymbol));



    if (country === "GB"){
        resultsPanel.classList.add("GB");
    }
 });

}

// ADD TO PREVIOUS LIST
const todayView = $("#todayView").val();
function renderButtons() {
    $("#previous").empty();
    for (var i = 0; i < cityArray.length; i++) {
        var a = $("<button>");
        a.addClass("previousCity");
        a.attr("data-name", cityArray[i]);
        a.text(cityArray[i]);
        $("#previous").append(a);
        }
};

// SHOW TODAYS DATA




};