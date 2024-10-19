# Weather App

This application provides current weather data for any location on Earth, utilizing the OpenWeatherMap API.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Download and install from [Node.js official website](https://nodejs.org/).

## Getting Started

To get started with this project, follow the steps below:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/Weather-APP.git

2. **Navigate to the frontend directory:**
   ```bash
    cd frontend

3. **Install dependencies:**
    ```bash
    npm install

4. **Run the app**
    ```bash
    npm start

The app will be running in development mode. Open http://localhost:3000 in your browser to view it.

>The page will reload if you make changes. Any lint errors will also appear in the console.
     

## OpenWeatherMap API
The app accesses current weather data from over 200,000 cities. Data is collected from global and local weather models, satellites, and a vast network of weather stations, available in JSON, XML, or HTML format.

## API Requests
1. By City Name:
You can call the API by city name, or by city name with state and country codes (state codes are only available for U.S. locations).
    - *API CALL:* By using [API-CALL](https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key})
    - *With Country Code:* By using [Country Code](https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key})

2. By City ID:
For unambiguous results, you can make an API call using the city ID. The list of city IDs can be found in city `.list.json.gz.`
    - *API CALL:* By using [API-CALL](https://api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key})

## WEB VIEW
You can check the web view on deployed [weather app](https://weather-app-theta-two-59.vercel.app/)

