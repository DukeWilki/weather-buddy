// HEADER date time and current location
const todayDate = $("#todayDate");
const rightNow = $("#rightNow");
const now = moment();
const date = now.format("DD MMMM YYYY");
const time = now.format("h:mm a");
todayDate.html(date);
rightNow.html(time);


// LEFT PANEL
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
let futureSection = document.getElementById("futureSection");
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
  // UNIVERSAL API DATA
  const apiUrlToday = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=";
  const apiUrlUv = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/uvi/forecast?";
  const apiUrlFuture = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=";
  const apiKey = "&appid=fd40ccd7b40508e5a2e810c079536a1d";
  const unit = "&units=metric";
  const unitStymbol = "°C";
  // const zulu = new Date().getTime();

  // let name = cityName.value
  // var localOffset = new Date().getTimezoneOffset();
  // var zulu = moment().add(-600, 'minutes')
  // console.log(localOffset)
  // console.log(zulu)

  //  TODAY'S AJAX
  let queryURLToday = apiUrlToday + city + unit + apiKey;
  console.log(queryURLToday);

  $.ajax({
    url: queryURLToday,
    method: "GET",
  }).then(function (response) {
    console.log("TODAYFC: ", response);
    // Weather conditions for Today
    var tempToday = response.main.temp;
    var humToday = response.main.humidity;
    var descToday = response.weather[0].description;
    var iconToday = response.weather[0].icon;
    var windToday = response.wind.speed;
    var name = response.name;
    var country = response.sys.country;
    var coord = "lat=" + response.coord.lat + "&lon=" + response.coord.lon;

    // var timezone = response.timezone
    // var timeDiff = timezone / 3600
    // console.log(timezone);
    // console.log(timeDiff);

    // UV INDEX AJAX
    let queryURLuv = apiUrlUv + coord + "&cnt=1" + apiKey;
    console.log(queryURLuv);

    $.ajax({
      url: queryURLuv,
      method: "GET",
    }).then(function (response) {
      console.log("UVINDEX: ", response);
      var uvToday = response[0].value;
      let uvRisk = []
      $("#uvToday").removeClass()
      if (uvToday <= 2){
        uvRisk = "low"
        console.log("low")
        console.log(uvRisk)
        $("#uvToday").addClass("low")
      }
      else if (uvToday <= 5){
        uvRisk = "moderate"
        console.log("moderate")
        console.log(uvRisk)
        $("#uvToday").addClass("moderate")
      }
      else if (uvToday <= 7){
        uvRisk = "high"
        console.log("high")
        console.log(uvRisk)
        $("#uvToday").addClass("high")
      }
      else if (uvToday <= 10){
        uvRisk = "very high"
        console.log("very high")
        console.log(uvRisk)
        $("#uvToday").addClass("veryhigh")
      }
      else {
        uvRisk = "extreme"
        console.log("extreme")
        console.log(uvRisk)
        $("#uvToday").addClass("extreme")
      }
      //   INSERT TODAY'S DATA INTO DOCUMENT
      $("#name").text(name + ", " + country);
      $("#date").text("Local time/date: " );
      $("#date").text(date);
      
      $("#iconToday").attr('src', 'https://openweathermap.org/img/wn/' + iconToday + '@2x.png');
      // $("#iconToday").text("icon " + iconToday);
      $("#descToday").text("Currently: " + descToday);
      $("#windToday").text("Wind tpeed: " + windToday + "m/s");
      $("#humToday").text("Humidity: " + humToday + "%");
      $("#tempToday").text("Temperature: " + tempToday + unitStymbol);
      $("#uvToday").text('UV index: ' + (uvToday + " " + uvRisk));
      // ADD TO LOCALSTORAGE FOR NEXT LOGIN
      localStorage.setItem("lastSeach", name);

      // SET IMAGE
      if (iconToday === "01d"){
        $("#imageSection").addClass("sunny")
      }
      else if (iconToday === "01n" || "02n"){
        $("#imageSection").addClass("stars")
      }
      else if (iconToday === "02d" || "03d" || "03n" || "04d" || "04n" ){
        $("#imageSection").addClass("cloudy")
      }
      else if (iconToday === "09d" || "09n" || "10d" || "10n" ){
        $("#imageSection").addClass("rain")
      }
      else if (iconToday === "13d" || "13n"){
        $("#imageSection").addClass("snow")
      }
      else if (iconToday === "11d" || "11n" ){
        $("#imageSection").addClass("thunder")
      }
      else {
        $("#imageSection").addClass("mist")
      }

  
      


    //  FIVE DAY AJAX
    let queryURLFuture = apiUrlFuture + city + unit + apiKey;
    console.log(queryURLFuture);

    $.ajax({
      url: queryURLFuture,
      method: "GET",
    }).then(function (response) {
      console.log("FUTUREW: ", response);
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

        // var dateFuture = weatherData.dt_txt;
        // let monthFuture = setMonth(month, dateFuture)
        
        // console.log(monthFuture)
        var dt_txt = weatherData.dt_txt;
  

        var iconFuture = weatherData["weather"]["0"].icon;
        var descFuture = weatherData["weather"]["0"].description;
        var tempFuture = weatherData["main"].temp;
        var humFuture = weatherData["main"].humidity;
        
          // const card = $('<div>');
          const card = document.createElement('ul');
          card.classList.add("col-sm");
          card.classList.add("card");
          // const cardItem = document.createElement('p');
          // card.innerHTML = cardItem;
          card.innerHTML = "<li>" + dt_txt + " UTC</li>";
          card.innerHTML += "<li>" + descFuture +"</li>";
          card.innerHTML += "<li>" + tempFuture + unitStymbol + "</li>";
          card.innerHTML += "<li>" + humFuture + "% humidity</li>";

          card.innerHTML += '<img src="https://openweathermap.org/img/wn/' + iconFuture + '@2x.png"/>';

          futureSection.appendChild(card)
          console.log("helo");

    

      }
    }); //Closing 5DAY AJAX response
  }); //Closing UV AJAX response
  }); // Closing TODAY AJAX response
}
