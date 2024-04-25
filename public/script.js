// document.addEventListener('DOMContentLoaded', () => {
  const searchBox = document.querySelector(".inp");
  const searchBtn = document.querySelector(".search-icon");


  async function getWeather(city) {
    const response = await axios.get(`/weather?city=${city}`);
    const data = response.data;
    document.querySelector(".temp-maths").textContent = data.temperature;
    document.querySelector(".city").textContent = data.city;
    document.querySelector(".humidPercent").textContent = data.humidity;
    document.querySelector(".windSpeed").textContent = data.windSpeed;
  
    const weatherImgs = [
      document.querySelector(".weatherImg1"),
      document.querySelector(".weatherImg2"),
      document.querySelector(".weatherImg3"),
      document.querySelector(".weatherImg4"),
      document.querySelector(".weatherImg5")
    ];
    
  
    for (let i = 0; i < 5; i++) {
      const weatherCondition = data.nextFiveWeather[i];
      if (weatherCondition == "Drizzle") {
        weatherImgs[i].src = "images/drizzle.png";
      } else if (weatherCondition == "Clear") {
        weatherImgs[i].src = "images/clear.png";
      } else if (weatherCondition == "Clouds") {
        weatherImgs[i].src = "images/clouds.png";
      } else if (weatherCondition == "Rain") {
        weatherImgs[i].src = "images/rain.png";
      } else if (weatherCondition == "Snow") {
        weatherImgs[i].src = "images/snow.png";
      } else {
        weatherImgs[i].src = "images/mist.png";
      }

    }

    const weatherTemp = [
      document.querySelector(".temp-maths1"),
      document.querySelector(".temp-maths2"),
      document.querySelector(".temp-maths3"),
      document.querySelector(".temp-maths4"),
      document.querySelector(".temp-maths5"),
     
    ];

    for (let i = 0; i < 5; i++) {
      const weatherText = data.nextFiveTemps[i];
        weatherTemp[i].innerText = weatherText;
    }

  }



  searchBtn.addEventListener("click", async () => {
    const city = searchBox.value.trim();
    if (city !== "") {
      try {
        await getWeather(city);
        searchBox.value = "";
      } catch (error) {
        console.error('Error:', error.message);
        alert("Error fetching weather data. Please try again.");
      }
    } else {
      alert("Please enter a city name");
    }
  });

  searchBox.addEventListener('keyup', async (event) => {
    if (event.key === "Enter") {
      const city = searchBox.value.trim();
      if (city !== "") {
        try {
          await getWeather(city);
          searchBox.value = "";
        } catch (error) {
          console.error('Error:', error.message);
          alert("Error fetching weather data. Please try again.");
        }
      } else {
        alert("Please enter a city name");
      }
    }
  });
// });


