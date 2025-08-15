import { create } from 'zustand'
import { fetchCurrentWeather, fetchForecast, type CurrentWeather, type ForecastDay, type Unit } from '../api/api'

type WeatherState = {
  current: CurrentWeather | null
  forecast: ForecastDay[]
  city: string | null
  loading: boolean
  error: string | null
  search: (city: string, unit: Unit) => Promise<void>
  clearError: () => void
}

export const useWeatherStore = create<WeatherState>((set) => ({
  current: null,
  forecast: [],
  city: null,
  loading: false,
  error: null,
  async search(city, unit) {
    const target = city.trim()
    if (!target) return
    set({ loading: true, error: null })
    try {
      const [currentWeather, forecast] = await Promise.all([
        fetchCurrentWeather(target, unit),
        fetchForecast(target, unit),
      ])
      set({ current: currentWeather, forecast: forecast, city: currentWeather.city })
    } catch (err) {
      set({ current: null, forecast: [], error: err instanceof Error ? err.message : 'Failed to fetch weather' })
    } finally {
      set({ loading: false })
    }
  },
  clearError() { set({ error: null }) },
}))


