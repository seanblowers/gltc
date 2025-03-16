document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '15c19a29fe96a9afee1a5d0479476ff1'; // Replace with your OpenWeatherMap API key
    const city = 'Springfield, MO'; // Corrected city name
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.main && data.weather) {
                document.querySelector('.weather-widget .temp').textContent = `Temperature: ${data.main.temp} °F`;
                document.querySelector('.weather-widget .humidity').textContent = `Humidity: ${data.main.humidity}%`;
                document.querySelector('.weather-widget .forecast').textContent = `Forecast: ${data.weather[0].description}`;
            } else {
                console.error('Error: Invalid data format', data);
                document.querySelector('.weather-widget .temp').textContent = 'Error loading data';
                document.querySelector('.weather-widget .humidity').textContent = '';
                document.querySelector('.weather-widget .forecast').textContent = '';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.querySelector('.weather-widget .temp').textContent = 'Error loading data';
            document.querySelector('.weather-widget .humidity').textContent = '';
            document.querySelector('.weather-widget .forecast').textContent = '';
        });
});
    
  /*  The code above fetches the weather data from the OpenWeatherMap API and updates the HTML content of the weather widget with the temperature, humidity, and forecast. 
    Step 4: Add the Weather Widget to Your Website 
    Now that you have the weather widget set up, you can add it to your website. To do this, you need to include the weather.js script in your HTML file. 
        Here is an example of how you can add the weather widget to your website:
    */