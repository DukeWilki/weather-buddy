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

// HEADER date time and current location
const today = $("#today");
const rightNow = $("#rightNow");
const now = moment();
const date = now.format("DD MMMM YYYY");
const time = now.format("h:mm a");
today.html(date);
rightNow.html(time);

// LEFT PANEL
// Search button listener
// DOM ELEMENTS
let cityName = document.getElementById("cityName");
let cityArray = [];
//run function to pull saved cities from local storage and fill array with it
function init(){
    let saved_cities = JSON.parse(localStorage.getItem("cities"));

    if (saved_cities !== null){
        citiyArray = saved_cities
    }   
}



// LISTENER
cityName.addEventListener("keyup", () => {
    searchCity.disabled = !cityName.value;
});

// searchCity.addEventListener("click", () => {
//     // localStorage.setItem(appointment.id, appointment.value);
//     localStorage.setItem("City", cityName.value);
//     // localStorage.setItem("CityList", cityArray.value);
//     cityArray.push(cityName);
//         //make sure cities array.length is never more than 8 
//         if(cities.length > 8){
//             cities.shift()
//         }
//     console.log(searchCity.value);
//     console.log(cityArray.value);
//     localStorage.setItem("cityArray", JSON.stringify(cityArray));
// });

