document.addEventListener("DOMContentLoaded", () => {
    const weatherWidget = document.getElementById('weather-widget');
    const apiKey = '3bfd511262f6c821c92b3312977c6984'; // Replace with your actual API key

    async function fetchWeather() {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=37.2089572&lon=-93.2922989&units=imperial&appid=15c19a29fe96a9afee1a5d0479476ff1`);
            const data = await response.json();
            updateWeatherWidget(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    function updateWeatherWidget(data) {
        const currentTemp = data.current.temp;
        const humidity = data.current.humidity;
        const windSpeed = data.current.wind_speed;

        weatherWidget.querySelector('.temp').textContent = `${currentTemp}°F`;
        weatherWidget.querySelector('.humidity').textContent = `Humidity: ${humidity}%`;
        weatherWidget.querySelector('.wind-speed').textContent = `Wind Speed: ${windSpeed} mph`;

        if (currentTemp < 50) {
            weatherWidget.style.background = '#1e3a8a'; // Cold
        } else if (currentTemp < 77) {
            weatherWidget.style.background = '#2563eb'; // Mild
        } else {
            weatherWidget.style.background = '#ef4444'; // Hot
        }
    }

    fetchWeather();
    setInterval(fetchWeather, 3600000); // Refresh every hour
});
