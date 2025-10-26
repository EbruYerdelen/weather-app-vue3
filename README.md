# Weather App Vue 3 : WeatherFly 🦋

A pretty and responsive weather forecast built with Vue 3, featuring dynamic themes that change based on weather conditions. Users can search for cities, view current weather data, and enjoy flying.

## 🚀 How to Run the Project

1. **Clone the repository**
   ```bash
   git clone https://github.com/EbruYerdelen/weather-app-vue3.git
   cd weather-app-vue3
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

 3. **Open your browser**
 Navigate to `http://localhost:5173`

### Demo Credentials
Use these credentials to test the application:
- **Email**: `test@demo.com`
- **Password**: `Test1234`
- You can enter whatever name you like for the name area.

## 🛠️ Technologies Used

### Frontend Framework & Libraries
- **Vue 3 Composition API**
- **Vuetify 3**
- **Vue Router**
- **Pinia**

### Development Tools
- **Vite**
- **JavaScript**

### APIs & Data
- **Open-Meteo API** - Weather data provider
- **Geocoding API** - City search and coordinates


## 🌤️ Weather Condition → Theme Mapping

The app dynamically changes its background theme based on weather conditions:

| Weather Codes | Theme | Background | Icon |
|---------------|--------|------------|------|
| 0, 1 | **Sunny** | Golden orange gradient | ☀️ Sunny |
| 2, 3, 45, 48 | **Cloudy** | Light blue-white gradient | ☁️ Cloudy |
| 51, 53, 55, 61, 63, 65, 80, 81, 82 | **Rainy** | Blue-gray gradient | 🌧️ Rainy |
| 71, 73, 75, 77, 85, 86 | **Snowy** | Light gray-white gradient | ❄️ Snowy |
| 95, 96, 99 | **Stormy** | Dark gray-green gradient | ⛈️ Stormy |

*Weather codes are based on the Open-Meteo API standard,for detailed info visit:* [Open Meteo Weather Forecast API](https://open-meteo.com/en/docs?current=weather_code).


## 🚧 Known Limitations

### Current Limitations
- **Mock Authentication** - Uses hardcoded demo credentials instead of real authentication system
- **Basic Error Handling** - Limited error recovery and user feedback
- **No Weather Forecast** - Shows only current weather, not multi-day forecasts
- **Limited Weather Details** - Only displays temperature,condition and city information.
- **No Favorites** - Lack of interactivity for user in terms of saving and accessing preferred locations

Built with 🦋 and Vue 3
