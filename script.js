const apikey = "6d664161591d75d8c8d57b7ccd7ba36a";
const apiurl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
// &appid={API key}

let searchBox = document.querySelector(".inp");
let searchBtn = document.querySelector(".search-icon");
let weatherImg = document.querySelector(".weatherImg");

//jb app load ho to delhi ka data a jaye
window.addEventListener("load", () => {
  checkWeather("delhi");
});

async function checkWeather(city) {
  const response = await fetch(apiurl + city + `&appid=${apikey}`);
  const data = await response.json();
  console.log(data);
  
  if (!data.main) {
    alert("Please enter valid city name")
  }
  document.querySelector(".temp-maths").innerHTML =
    data.main.temp.toFixed(1) + "°C";
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".humidPercent").innerHTML = data.main.humidity + "%";
  document.querySelector(".windSpeed").innerHTML = data.wind.speed + " Km/h";

  if (data.weather[0].main == "Drizzle") {
    weatherImg.src = "images/drizzle.png";
  }else if (data.weather[0].main == "Clear") {
    weatherImg.src = "images/clear.png";
  }else if (data.weather[0].main == "Clouds") {
    weatherImg.src = "images/clouds.png";
  }else if (data.weather[0].main == "Rain") {
    weatherImg.src = "images/rain.png";
  }else if (data.weather[0].main == "Snow") {
    weatherImg.src = "images/snow.png";
  }else {
    weatherImg.src = "images/mist.png";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);

  setTimeout(() => {
    searchBox.value = "";
  }, 2000);
});

searchBox.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
        setTimeout(() => {
            searchBox.value = "";
          }, 2000);

    }
});

