

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 4445;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/weather', async (req, res) => {
  try {
    const city = req.query.city;

    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }

    const apiKey = "6d664161591d75d8c8d57b7ccd7ba36a"; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?&units=metric&q=${city}&cnt=6&appid=${apiKey}`;
    const response = await axios.get(apiUrl);

    const data = response.data;

    const weatherInfo = {
      city: data.city.name,
      temperature: data.list[0].main.temp.toFixed(1) + "°C",
      humidity: data.list[0].main.humidity + "%",
      windSpeed: data.list[0].wind.speed + " Km/h",
      nextFiveWeather: data.list.slice(1, 6).map(item => item.weather[0].main),
      nextFiveTemps: data.list.slice(1, 6).map(item => item.main.temp.toFixed(1) + "°C")
    };

    res.json(weatherInfo);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
