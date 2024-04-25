const apikey = "6d664161591d75d8c8d57b7ccd7ba36a";
const apiurl ="https://api.openweathermap.org/data/2.5/forecast?&units=metric&q=";



//extra
 // "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";


let searchBox = document.querySelector(".inp");
let searchBtn = document.querySelector(".search-icon");
let weatherImg = document.querySelector(".weatherImg");

let weatherImgs = [
  document.querySelector(".weatherImg1"),
  document.querySelector(".weatherImg2"),
  document.querySelector(".weatherImg3"),
  document.querySelector(".weatherImg4"),
  document.querySelector(".weatherImg5")
];

//jb app load ho to delhi ka data a jaye
window.addEventListener("load", () => {
  checkWeather("delhi");
});

async function checkWeather(city) {
  const response = await fetch(apiurl + city +`&cnt=6` +`&appid=${apikey}`);
  console.log(response);
  const data = await response.json();
  console.log(data);
  
  if (!data.city.name) {
    alert("Please enter valid city name")
  }
  document.querySelector(".temp-maths").innerHTML =
    data.list[0].main.temp.toFixed(1) + "°C";
  document.querySelector(".city").innerHTML = data.city.name;
  document.querySelector(".humidPercent").innerHTML = data.list[0].main.humidity + "%";
  document.querySelector(".windSpeed").innerHTML = data.list[0].wind.speed + " Km/h";

  if (data.list[0].weather[0].main == "Drizzle") {
    weatherImg.src = "images/drizzle.png";
  }else if (data.list[0].weather[0].main == "Clear") {
    weatherImg.src = "images/clear.png";
  }else if (data.list[0].weather[0].main == "Clouds") {
    weatherImg.src = "images/clouds.png";
  }else if (data.list[0].weather[0].main == "Rain") {
    weatherImg.src = "images/rain.png";
  }else if (data.list[0].weather[0].main == "Snow") {
    weatherImg.src = "images/snow.png";
  }else {
    weatherImg.src = "images/mist.png";
  }

  for (let i = 1; i < 6; i++) {
    if (data.list[i].weather[0].main == "Drizzle") {
      weatherImgs[i-1].src = "images/drizzle.png";
    } else if (data.list[i].weather[0].main == "Clear") {
      weatherImgs[i-1].src = "images/clear.png";
    } else if (data.list[i].weather[0].main == "Clouds") {
      weatherImgs[i-1].src = "images/clouds.png";
    } else if (data.list[i].weather[0].main == "Rain") {
      weatherImgs[i-1].src = "images/rain.png";
    } else if (data.list[i].weather[0].main == "Snow") {
      weatherImgs[i-1].src = "images/snow.png";
    } else {
      weatherImgs[i-1].src = "images/mist.png";
    }
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

