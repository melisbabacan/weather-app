# Weather App (Vite + React + TypeScript + Tailwind)

## 📌 Overview
This Weather App allows users to search for any city by name and view real-time weather information.  
It provides a clean and responsive interface, supports temperature unit switching, and displays loading/error states for a smooth user experience.

### Core Features
- 🔍 **City Search** — Search by city name ( button click or Enter key)
- 🌡 **Current Weather Details** — City, country, temperature, feels-like temperature, description, humidity
- 🔄 **Temperature Unit Toggle** — Switch between Celsius (°C) and Fahrenheit (°F)
- ⏳ **Loading & Error States** — Feedback while fetching or when a city is not found
- 🌑 **Optional Features** — 5-day forecast and Dark Mode 

## ⚙️ Setup & Run Locally

1. **Install Node.js 18+**  
   Download from: [https://nodejs.org](https://nodejs.org)

2. **Clone the repository**
   ```bash
   git clone https://github.com/melisbabacan/weather-app.git
   cd weather-app

# Install dependencies

- npm install

# Configure environment variables
- Open .env and set your VITE_WEATHER_API_KEY value (see API Key section).
# Obtaining and Using the API Key

- Go to OpenWeather API

- Create a free account or log in

- Navigate to API Keys in your account settings

- Copy your API key

- Open .env in the project root and replace the placeholder:

VITE_WEATHER_API_KEY=your_api_key;


- Save the file and restart the development server

# Run the development server

npm run dev

- Open in your browser
Visit: http://localhost:5173

## 🛠 Tech Stack
- **React** — UI development
- **TypeScript** — Type safety
- **Vite** — Fast build tool
- **Tailwind CSS** — Utility-first CSS framework for styling
- **Zustand** — Lightweight state management
- **OpenWeather API** — Weather data source
