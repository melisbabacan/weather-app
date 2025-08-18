export type Unit = "metric" | "imperial";

export type CurrentWeather = {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  humidity: number;
  windSpeed: number;
  windUnit: string;
  clouds: number;
};

export type ForecastDay = {
  date: string;
  tempMin: number;
  tempMax: number;
  description: string;
};


export type CityResult = {
  name: string;
  country: string;
  lat: number;
  lon: number;
};

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string | undefined;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "http://api.openweathermap.org/geo/1.0/direct";

function ensureApiKey() {
  if (!API_KEY)
    throw new Error("Missing API key. Set VITE_WEATHER_API_KEY in .env");
}


export async function fetchCurrentWeather(
    city: string,
    unit: Unit
): Promise<CurrentWeather> {
  ensureApiKey();
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(
      city
  )}&units=${unit}&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 404) throw new Error("City not found");
    throw new Error("Failed to load weather data");
  }
  const data = await res.json();



  const windUnit = unit === "metric" ? "m/s" : "mph";

  return {
    city: data.name,
    country: data.sys?.country ?? "",
    temperature: data.main?.temp ?? 0,
    feelsLike: data.main?.feels_like ?? 0,
    description: data.weather?.[0]?.description ?? "—",
    humidity: data.main?.humidity ?? 0,
    windSpeed: data.wind?.speed ?? 0,
    windUnit,
    clouds: data.clouds?.all ?? 0,
  };
}

export async function fetchForecast(
    city: string,
    unit: Unit
): Promise<ForecastDay[]> {
  ensureApiKey();
  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(
      city
  )}&units=${unit}&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();

  const daysMap: Record<string, ForecastDay> = {};
  for (const item of data.list) {
    const date = item.dt_txt.split(" ")[0];
    const tempMin = item.main?.temp_min ?? item.main?.temp;
    const tempMax = item.main?.temp_max ?? item.main?.temp;
    const description = item.weather?.[0]?.description ?? "—";

    if (!daysMap[date]) {
      daysMap[date] = {
        date,
        tempMin,
        tempMax,
        description,
      };
    } else {
      daysMap[date].tempMin = Math.min(daysMap[date].tempMin, tempMin);
      daysMap[date].tempMax = Math.max(daysMap[date].tempMax, tempMax);
      if (item.dt_txt.includes("12:00:00")) {
        daysMap[date].description = description;
      }
    }
  }

  return Object.values(daysMap).slice(0, 5);
}


export async function searchCities(query: string): Promise<CityResult[]> {
  ensureApiKey();
  const res = await fetch(
      `${GEO_URL}?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to search cities");
  return await res.json();
}
