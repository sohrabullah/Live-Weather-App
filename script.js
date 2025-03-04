const apiKey = '8fe4035c2fe34ec20126d9a982d6b636'; // Your API Key

async function getWeather() {
    const city = document.getElementById('city').value.trim();
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            document.getElementById('weather-result').innerHTML = `
                <h3>${data.name}, ${data.sys.country}</h3>
                <img src="${weatherIcon}" alt="${data.weather[0].description}">
                <p>Temperature: <strong>${data.main.temp}°C</strong></p>
                <p>Feels Like: ${data.main.feels_like}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
        } else {
            document.getElementById('weather-result').innerHTML = `<p style="color: red;">Error: ${data.message}</p>`;
        }
    } catch (error) {
        console.log(error);
        document.getElementById('weather-result').innerHTML = `<p style="color: red;">Network Error. Please try again!</p>`;
    }
}
