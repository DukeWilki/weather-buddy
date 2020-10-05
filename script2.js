// HEADER DATE AND TIME
const todayDate = $("#todayDate");
const rightNow = $("#rightNow");
const now = moment();
const date = now.format("DD MMMM YYYY");
const time = now.format("h:mm a");
todayDate.html(date);
rightNow.html(time);

// HISTORY
let lastSeach = localStorage.getItem("lastSeach");
let cityArray = [];
let currentArray = localStorage.getItem("cityArray");
if (localStorage.getItem("cityArray") !== null) {
  cityArray = currentArray.split(",");
}

// CREATE HISTORY BUTONS
if (localStorage.getItem("cityArray") !== null) {
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

// LAST SEARCH VS RANDOM ON STARTUP
checking();
if (localStorage.getItem("lastSeach") !== null) {
  let cityName = lastSeach;
  sendAPI(cityName);
} else {
  let cityName = "Random";
  sendAPI(cityName);
}

// LISTENERS AND CLICKS: ENABLE SEARCH BUTTON
let cityName = document.getElementById("cityName");
let futureSection = document.getElementById("futureSection");
cityName.addEventListener("keyup", () => {
  search.disabled = !cityName.value;
});

// LISTENERS AND CLICKS: SEARCH FUNCTION
$("#search").on("click", function (event) {
  checking();
  $("#futureSection").empty();
  let cityName = document.getElementById("cityName").value;
  cityArray.push([cityName]);
  localStorage.setItem("cityArray", cityArray);
  document.getElementById("cityName").value = "";
  sendAPI(cityName);
  renderPreviousButtons();
});

// LISTENERS AND CLICKS: SELECT FROM PREVIOUS SEARCH
$(document).on("click", ".previousCity", function (event) {
  checking();
  $("#futureSection").empty();
  let cityName = $(this).text().trim();
  sendAPI(cityName);
});

// LISTENERS AND CLICKS: TROPICAL WILDCARD
$(document).on("click", ".tropical", function (event) {
  checking();
  $("#futureSection").empty();
  const tropicsArray = [
    "Apia",
    "Dili",
    "Montego Bay",
    "Male",
    "Honiara",
    "Nadi",
    "Adamstown",
    "Cabo Verde",
    "Nassau",
    "Nauru",

    "Tabwakea Village",
    "Niue",
    "Arawa",
    "Bali",
    "Cebu",
    "Port Blair",
    "Hadibu",
    "Lamu",
    "Victoria, SC",
    "Moroni",

  ];
  let cityName = tropicsArray[Math.floor(Math.random() * tropicsArray.length)];
  sendAPI(cityName);
});

// LISTENERS AND CLICKS: MOUNTAIN WILDCARD
$(document).on("click", ".mountain", function (event) {
  checking();
  $("#futureSection").empty();
  const mountainArray = [
    "Katoomba",
    "Innsbruck",
    "Kathmandu",
    "Quito",
    "Lhasa",
    "Banff",
    "Aspen",
    "Arthur's Pass",
    "La Paz",
    "Vaduz",

    "La Rinconada, PE",
    "Laya, BT",
    "El Aguilar",
    "Dingboche",
    "Colquechaca",
    "Saint Moritz",
    "Stepantsminda",
    "Almaty",
    "Akhpradzor",
    "Ifrane",

  ];
  let cityName =
    mountainArray[Math.floor(Math.random() * mountainArray.length)];
  sendAPI(cityName);
});

// LISTENERS AND CLICKS: DESERT WILDCARD
$(document).on("click", ".desert", function (event) {
  checking();
  $("#futureSection").empty();
  const desertArray = [
    "Tennant Creek",
    "Timbuktu",
    "Riyadh",
    "Khartoum",
    "Tucson",
    "Coober Pedy",
    "Muscat",
    "Amman",
    "Aleppo",
    "Niamey",

    "Kolmanskop",
    "Pozo Almonte",
    "Casablanca",
    "Sharm El Sheikh",
    "Hohhot",
    "Bikaner",
    "Almeria ",
    "Kucha",
    "Uyuni",
    "Tottori",
    
  ];
  let cityName = desertArray[Math.floor(Math.random() * desertArray.length)];
  sendAPI(cityName);
});

// LISTENERS AND CLICKS: POLAR WILDCARD
$(document).on("click", ".polar", function (event) {
  checking();
  $("#futureSection").empty();
  const polarArray = [
    "McMurdo Station",
    "Port-aux-Français",
    "Nuuk",
    "Rovaniemi",
    "Noril'sk",
    "Longyearbyen",
    "Tromsø",
    "Taloyoak",
    "Murmansk",
    "Fairbanks",

    "Verkhoyansk",
    "Inuvik",
    "Harbin",
    "Yakutsk",
    "Tórshavn",
    "Olonkinbyen",
    "Isachsen",
    "Grytviken",
    "Kaiken",
    "Punta Arenas",

  ];
  let cityName = polarArray[Math.floor(Math.random() * polarArray.length)];
  sendAPI(cityName);
});

function checking() {
  $("#imageSection").removeClass("sunny");
  $("#imageSection").removeClass("stars");
  $("#imageSection").removeClass("cloudy");
  $("#imageSection").removeClass("rain");
  $("#imageSection").removeClass("snow");
  $("#imageSection").removeClass("thunder");
  $("#imageSection").removeClass("cloudynight");
  $("#imageSection").removeClass("rainnight");
  $("#imageSection").removeClass("snownight");
  $("#imageSection").removeClass("thundernight");
  $("#imageSection").removeClass("mistnight");
  $("#imageSection").addClass("checking");
}

// API FUNCTION
function sendAPI(city) {
  // UNIVERSAL API DATA
  const apiUrlToday =
    "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=";
  const apiUrlUv =
    "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/uvi/forecast?";
  const apiUrlFuture =
    "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=";
  const apiKey = "&appid=fd40ccd7b40508e5a2e810c079536a1d";
  const unit = "&units=metric";
  const unitStymbol = "°C";

  //  TODAY'S AJAX
  let queryURLToday = apiUrlToday + city + unit + apiKey;

  $.ajax({
    url: queryURLToday,
    method: "GET",
  }).then(function (response) {
    // Weather conditions for Today
    let tempToday = response.main.temp;
    let humToday = response.main.humidity;
    let descToday = response.weather[0].description;
    let iconToday = response.weather[0].icon;
    let windToday = response.wind.speed;
    let name = response.name;
    let country = response.sys.country;
    let coord = "lat=" + response.coord.lat + "&lon=" + response.coord.lon;

    // UV INDEX AJAX
    let queryURLuv = apiUrlUv + coord + "&cnt=1" + apiKey;

    $.ajax({
      url: queryURLuv,
      method: "GET",
    }).then(function (response) {
      var uvToday = response[0].value;
      let uvRisk = [];
      $("#uvToday").removeClass();
      if (uvToday <= 2) {
        uvRisk = "low";
        $("#uvToday").addClass("low");
      } else if (uvToday <= 5) {
        uvRisk = "moderate";
        $("#uvToday").addClass("moderate");
      } else if (uvToday <= 7) {
        uvRisk = "high";
        $("#uvToday").addClass("high");
      } else if (uvToday <= 10) {
        uvRisk = "very high";
        $("#uvToday").addClass("veryhigh");
      } else {
        uvRisk = "extreme";
        $("#uvToday").addClass("extreme");
      }
      //   INSERT TODAY'S DATA INTO DOCUMENT
      $("#name").text(name + ", " + country);
      $("#date").text("Local time/date: ");
      $("#date").text(date);
      $("#iconToday").attr(
        "src",
        "https://openweathermap.org/img/wn/" + iconToday + "@2x.png"
      );
      $("#descToday").text("Currently: " + descToday);
      $("#windToday").text("Wind tpeed: " + windToday + "m/s");
      $("#humToday").text("Humidity: " + humToday + "%");
      $("#tempToday").text("Temperature: " + tempToday + unitStymbol);
      $("#uvToday").text("UV index: " + (uvToday + " " + uvRisk));
      // ADD TO LOCALSTORAGE FOR NEXT LOGIN
      localStorage.setItem("lastSeach", name);

      // SET IMAGE
      $("#imageSection").removeClass("checking");
      if (iconToday === "01d") {
        $("#imageSection").addClass("sunny");
      } else if (iconToday === "01n") {
        $("#imageSection").addClass("stars");
      } else if (
        iconToday === "02d" ||
        iconToday === "03d" ||
        iconToday === "04d"
      ) {
        $("#imageSection").addClass("cloudy");
      } else if (
        iconToday === "02n" ||
        iconToday === "03n" ||
        iconToday === "04n"
      ) {
        $("#imageSection").addClass("cloudynight");
      } else if (iconToday === "09d" || iconToday === "10d") {
        $("#imageSection").addClass("rain");
      } else if (iconToday === "09n" || iconToday === "10n") {
        $("#imageSection").addClass("rain");
      } else if (iconToday === "11d") {
        $("#imageSection").addClass("thunderday");
      } else if (iconToday === "11n") {
        $("#imageSection").addClass("thunder");
      } else if (iconToday === "13d") {
        $("#imageSection").addClass("snow");
      } else if (iconToday === "13n") {
        $("#imageSection").addClass("snownight");
      } else {
        $("#imageSection").addClass("mist");
      }

      //  FIVE DAY AJAX
      let queryURLFuture = apiUrlFuture + city + unit + apiKey;
      $.ajax({
        url: queryURLFuture,
        method: "GET",
      }).then(function (response) {
        let futureResults = response.list;
        let futureForcast = [];
        // FORCAST IS DELIVERED BY API IN 3 HOUR BLOCKS, THE FORMULA BELOW IS TO TAKE A DAILY SNAPSHOT
        for (let index = 0; index < futureResults.length; index++) {
          const isEigth = (index + 1) % 8 === 0;
          if (isEigth) {
            futureForcast.push(futureResults[index]);
          }
        }

        // ASSIGN VARIABLES
        for (let index = 0; index < futureForcast.length; index++) {
          let weatherData = futureForcast[index];
          let dt_txt = weatherData.dt_txt;
          let iconFuture = weatherData["weather"]["0"].icon;
          let descFuture = weatherData["weather"]["0"].description;
          let tempFuture = weatherData["main"].temp;
          let humFuture = weatherData["main"].humidity;

          // CREATE FUTURE CARDS
          const card = document.createElement("ul");
          card.classList.add("col-sm");
          card.classList.add("card");
          card.innerHTML = "<li>" + cityName + name + city + "</li>";
          card.innerHTML = "<li>" + dt_txt + " UTC</li>";
          card.innerHTML += "<li>" + descFuture + "</li>";
          card.innerHTML += "<li>" + tempFuture + unitStymbol + "</li>";
          card.innerHTML += "<li>" + humFuture + "% humidity</li>";
          card.innerHTML +=
            '<img src="https://openweathermap.org/img/wn/' +
            iconFuture +
            '@2x.png"/>';
          futureSection.appendChild(card);
        }
      }); //Closing 5DAY AJAX response
    }); //Closing UV AJAX response
  }); // Closing TODAY AJAX response
}
