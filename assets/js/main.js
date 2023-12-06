let btn = document.querySelector(".btn");
let cityArray = JSON.parse(localStorage.getItem("array")) || [];

cityArray.forEach((index) => {
    let newL = document.createElement("li");
    html = `${index}`;
    newL.innerHTML = html;
    document.querySelector(".list").appendChild(newL);
});
// Check city button event listener
btn.addEventListener("click", function (event) {
  event.preventDefault();
  if (cityArray.length > 7) {
    console.log("the list is longer than 7");
    cityArray.shift();
    localStorage.setItem("array", JSON.stringify(cityArray));
    cityArray = JSON.parse(localStorage.getItem("array"));
  }
  let chosenCity = document.querySelector(".textField").value;
  console.log(chosenCity);

  cityArray = JSON.parse(localStorage.getItem("array")) || [];
  cityArray.push(chosenCity);
  localStorage.setItem("array", JSON.stringify(cityArray));
  console.log(cityArray);

  let newL = document.createElement("li");
  let html = `${cityArray[cityArray.length - 1]}`;
  newL.innerHTML = html;
  document.querySelector(".list").appendChild(newL);

  var key = "appid=b54627d0769529bdd5c76834e074fdb3";
  var url = "https://api.openweathermap.org/data/2.5/forecast?";
  var urlG = `http://api.openweathermap.org/geo/1.0/direct?q=${chosenCity}&limit=1&`;
  let lat = "";
  let lon = "";
  let apiOptions = "units=metric&exclude=minutely,alerts&";
  let fileG = urlG + apiOptions + key;
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
      console.log(data);
      console.log(data[0].lat, data[0].lon);
      lat = parseFloat(data[0].lat).toFixed(4);
      lon = parseFloat(data[0].lon).toFixed(4);
      console.log("Latitude is " + lat);
      console.log("Longitude is " + lon);
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
        console.log(data);
        let city = data.city.name;
        let country = data.city.country;
        console.log(city, country);
        document.querySelector(".cityName").textContent = city + ", " + country;
        let main = data.list[0].weather[0].main;
        let icon = data.list[0].weather[0].icon;
        let description = data.list[0].weather[0].description;
        document.querySelector(".description").textContent =
          main + " with " + description;
        let temp = Math.round(data.list[0].main.temp);
        document.querySelector(".temp").textContent = `Temp: ${temp} °C`;
        let humidity = data.list[0].main.humidity;
        document.querySelector(".humidity").textContent = `Humidity: ${humidity} %`;
        let wind = parseFloat(data.list[0].wind.speed * 3.6).toFixed(1);
        document.querySelector(".wind").textContent = `Wind: ${wind} km/hr`;
        let timestamp = data.list[0].dt;
        let date = new Date(timestamp * 1000);
        let iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        console.log(date.toLocaleString());
        let onlyDate = `${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;
        document.querySelector(".date").textContent = onlyDate;
        document.querySelector(".iconImg").src = iconURL;
        console.log("The weather is " + main + " with " + description);
        console.log("temperature of " + temp + " °C");
        console.log("humidity of " + humidity + " %");
        console.log("wind of " + wind + " km/hr");
        // First day forescast values
        let icon1 = data.list[8].weather[0].icon;
        let iconURL1 = `https://openweathermap.org/img/wn/${icon1}@2x.png`;
        let temp1 = Math.round(data.list[8].main.temp);
        let main1 = data.list[8].weather[0].main;
        let description1 = data.list[8].weather[0].description;
        let humidity1 = data.list[8].main.humidity;
        let wind1 = parseFloat(data.list[8].wind.speed * 3.6).toFixed(2);
        timestamp = data.list[8].dt;
        date = new Date(timestamp * 1000);
        let onlyDate1 = `${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;
        document.querySelector(".cityName1").textContent = city + ", " + country;
        document.querySelector(".date1").textContent = onlyDate1;
        document.querySelector(".iconImg1").src = iconURL1;
        document.querySelector(".temp1").textContent = `Temp: ${temp1} °C`;
        document.querySelector(".description1").textContent =
          main1 + " with " + description1;
        document.querySelector(".humidity1").textContent = `Humidity: ${humidity1} %`;
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
        let wind2 = parseFloat(data.list[16].wind.speed * 3.6).toFixed(2);
        timestamp = data.list[16].dt;
        date = new Date(timestamp * 1000);
        let onlyDate1 = `${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;
        document.querySelector(".cityName2").textContent = city + ", " + country;
        document.querySelector(".date2").textContent = onlyDate1;
        document.querySelector(".iconImg2").src = iconURL1;
        document.querySelector(".temp2").textContent = `Temp: ${temp1} °C`;
        document.querySelector(".description2").textContent =
          main1 + " with " + description1;
        document.querySelector(".humidity2").textContent = `Humidity: ${humidity1} %`;
        document.querySelector(".wind2").textContent = `Wind: ${wind1} km/hr`;
      }
      })
      .catch(function () {
        console.log("Error");
      });
  }
});
