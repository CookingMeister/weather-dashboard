const btn = document.querySelector(".btn");
let chosenCity;
let city;
let cityArray = JSON.parse(localStorage.getItem("array")) || [];

// Create city search history list from local storage on reload
cityArray.forEach((index) => {
  let newL = document.createElement("li");
  html = `${index}`;
  newL.innerHTML = html;
  document.querySelector(".list").appendChild(newL);
});
// Check city on click
btn.addEventListener("click", function (event) {
  event.preventDefault();
  getStarted();
});
// Check city on keypress Enter
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getStarted();
  }
});
// Check city on press of saved city list items
let list = document.querySelector(".list");
list.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    // Get the text value of the list item
    city = event.target.textContent;
    // Pass value of city to function
    getStarted(city);
  }
});

// The main function

function getStarted(city) {
  // Checks if a value for city is passed to function
  if (city) {
    chosenCity = city;
  } else {
    chosenCity = document.querySelector(".textField").value;
    if (chosenCity === "") {
      alert("please enter a proper city name");
    }
  }

  // Get cityArray values from local storage and limit its length to 7
  if (cityArray.length > 7) {
    cityArray.shift();
    localStorage.setItem("array", JSON.stringify(cityArray));
    cityArray = JSON.parse(localStorage.getItem("array"));
  }
  // Populate and set values for cityArray in local storage
  cityArray = JSON.parse(localStorage.getItem("array")) || [];
  cityArray.push(chosenCity);
  localStorage.setItem("array", JSON.stringify(cityArray));
  // Create list item of city search history
  let newL = document.createElement("li");
  let html = `${cityArray[cityArray.length - 1]}`;
  newL.innerHTML = html;
  document.querySelector(".list").appendChild(newL);
  // Fetch weather section
  const key = "appid=b54627d0769529bdd5c76834e074fdb3";
  const url = "https://api.openweathermap.org/data/2.5/forecast?";
  let urlG = `http://api.openweathermap.org/geo/1.0/direct?q=${chosenCity}&limit=1&`;
  let lat = "";
  let lon = "";
  const apiOptions = "units=metric&exclude=minutely,alerts&";
  const fileG = urlG + apiOptions + key;
  let latitude = "lat=" + lat + "&";
  let longitude = "lon=" + lon + "&";
  let file = url + latitude + longitude + apiOptions + key;
  // Delete old stored weather
  caches.delete(fileG);
  // Get geo coordinates from name
  fetch(fileG, { cache: "no-cache" })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      lat = parseFloat(data[0].lat).toFixed(4);
      lon = parseFloat(data[0].lon).toFixed(4);
      getWeather();
    })
    .catch(function () {
      console.log("Error");
    });
  // Get weather from coordinates
  function getWeather() {
    latitude = "lat=" + lat + "&";
    longitude = "lon=" + lon + "&";
    file = url + latitude + longitude + apiOptions + key;

    caches.delete(file);

    fetch(file, { cache: "no-cache" })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let city = data.city.name;
        let country = data.city.country;
        document.querySelector(".cityName").textContent = city + ", " + country;
        let main = data.list[0].weather[0].main;
        let icon = data.list[0].weather[0].icon;
        let feels = Math.round(data.list[0].main.feels_like);
        document.querySelector(
          ".feels"
        ).textContent = `Feels like: ${feels} °C`;
        let description = data.list[0].weather[0].description;
        document.querySelector(".description").textContent =
          main + " with " + description;
        let temp = Math.round(data.list[0].main.temp);
        document.querySelector(".temp").textContent = `Temp: ${temp} °C`;
        let humidity = data.list[0].main.humidity;
        document.querySelector(
          ".humidity"
        ).textContent = `Humidity: ${humidity} %`;
        let wind = parseFloat(data.list[0].wind.speed * 3.6).toFixed(1);
        document.querySelector(".wind").textContent = `Wind: ${wind} km/hr`;
        let timestamp = data.list[0].dt;
        let date = new Date(timestamp * 1000);
        let iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        let onlyDate = `${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;
        document.querySelector(".date").textContent = onlyDate;
        document.querySelector(".iconImg").src = iconURL;

        // First day forescast values
        let icon1 = data.list[8].weather[0].icon;
        let iconURL1 = `https://openweathermap.org/img/wn/${icon1}@2x.png`;
        let temp1 = Math.round(data.list[8].main.temp);
        let main1 = data.list[8].weather[0].main;
        let description1 = data.list[8].weather[0].description;
        let humidity1 = data.list[8].main.humidity;
        let wind1 = parseFloat(data.list[8].wind.speed * 3.6).toFixed(1);
        timestamp = data.list[8].dt;
        date = new Date(timestamp * 1000);
        let onlyDate1 = `${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;
        // document.querySelector(".cityName1").textContent = city + ", " + country;
        document.querySelector(".date1").textContent = onlyDate1;
        document.querySelector(".iconImg1").src = iconURL1;
        document.querySelector(".temp1").textContent = `Temp: ${temp1} °C`;
        document.querySelector(".description1").textContent =
          main1 + " with " + description1;
        document.querySelector(
          ".humidity1"
        ).textContent = `Humidity: ${humidity1} %`;
        document.querySelector(".wind1").textContent = `Wind: ${wind1} km/hr`;
        getSecondDay();

        // Second day forecast values
        function getSecondDay() {
          let icon2 = data.list[16].weather[0].icon;
          let iconURL2 = `https://openweathermap.org/img/wn/${icon2}@2x.png`;
          let temp2 = Math.round(data.list[16].main.temp);
          let main2 = data.list[16].weather[0].main;
          let description2 = data.list[16].weather[0].description;
          let humidity2 = data.list[16].main.humidity;
          let wind2 = parseFloat(data.list[16].wind.speed * 3.6).toFixed(1);
          timestamp = data.list[16].dt;
          date = new Date(timestamp * 1000);
          let onlyDate = `${
            date.getMonth() + 1
          }/${date.getDate()}/${date.getFullYear()}`;
          document.querySelector(".date2").textContent = onlyDate;
          document.querySelector(".iconImg2").src = iconURL2;
          document.querySelector(".temp2").textContent = `Temp: ${temp2} °C`;
          document.querySelector(".description2").textContent =
            main2 + " with " + description2;
          document.querySelector(
            ".humidity2"
          ).textContent = `Humidity: ${humidity2} %`;
          document.querySelector(".wind2").textContent = `Wind: ${wind2} km/hr`;
        }
        getThirdDay();

        // Third day forecast values
        function getThirdDay() {
          let icon3 = data.list[24].weather[0].icon;
          let iconURL3 = `https://openweathermap.org/img/wn/${icon3}@2x.png`;
          let temp3 = Math.round(data.list[24].main.temp);
          let main3 = data.list[24].weather[0].main;
          let description3 = data.list[24].weather[0].description;
          let humidity3 = data.list[24].main.humidity;
          let wind3 = parseFloat(data.list[24].wind.speed * 3.6).toFixed(1);
          timestamp = data.list[24].dt;
          date = new Date(timestamp * 1000);
          let onlyDate = `${
            date.getMonth() + 1
          }/${date.getDate()}/${date.getFullYear()}`;
          document.querySelector(".date3").textContent = onlyDate;
          document.querySelector(".iconImg3").src = iconURL3;
          document.querySelector(".temp3").textContent = `Temp: ${temp3} °C`;
          document.querySelector(".description3").textContent =
            main3 + " with " + description3;
          document.querySelector(
            ".humidity3"
          ).textContent = `Humidity: ${humidity3} %`;
          document.querySelector(".wind3").textContent = `Wind: ${wind3} km/hr`;
        }
        getFourthDay();

        // Fourth day forecast values
        function getFourthDay() {
          let icon4 = data.list[32].weather[0].icon;
          let iconURL4 = `https://openweathermap.org/img/wn/${icon4}@2x.png`;
          let temp4 = Math.round(data.list[32].main.temp);
          let main4 = data.list[32].weather[0].main;
          let description4 = data.list[32].weather[0].description;
          let humidity4 = data.list[32].main.humidity;
          let wind4 = parseFloat(data.list[32].wind.speed * 3.6).toFixed(1);
          timestamp = data.list[32].dt;
          date = new Date(timestamp * 1000);
          let onlyDate = `${
            date.getMonth() + 1
          }/${date.getDate()}/${date.getFullYear()}`;
          document.querySelector(".date4").textContent = onlyDate;
          document.querySelector(".iconImg4").src = iconURL4;
          document.querySelector(".temp4").textContent = `Temp: ${temp4} °C`;
          document.querySelector(".description4").textContent =
            main4 + " with " + description4;
          document.querySelector(
            ".humidity4"
          ).textContent = `Humidity: ${humidity4} %`;
          document.querySelector(".wind4").textContent = `Wind: ${wind4} km/hr`;
        }
        getFifthDay();

        // Fifth day forecast values
        function getFifthDay() {
          let icon5 = data.list[39].weather[0].icon;
          let iconURL5 = `https://openweathermap.org/img/wn/${icon5}@2x.png`;
          let temp5 = Math.round(data.list[39].main.temp);
          let main5 = data.list[39].weather[0].main;
          let description5 = data.list[39].weather[0].description;
          let humidity5 = data.list[39].main.humidity;
          let wind5 = parseFloat(data.list[39].wind.speed * 3.6).toFixed(1);
          timestamp = data.list[39].dt;
          date = new Date(timestamp * 1000);
          let onlyDate = `${
            date.getMonth() + 1
          }/${date.getDate()}/${date.getFullYear()}`;
          document.querySelector(".date5").textContent = onlyDate;
          document.querySelector(".iconImg5").src = iconURL5;
          document.querySelector(".temp5").textContent = `Temp: ${temp5} °C`;
          document.querySelector(".description5").textContent =
            main5 + " with " + description5;
          document.querySelector(
            ".humidity5"
          ).textContent = `Humidity: ${humidity5} %`;
          document.querySelector(".wind5").textContent = `Wind: ${wind5} km/hr`;
        }
      })
      .catch(function () {
        console.log("Error");
      });
  }
}
