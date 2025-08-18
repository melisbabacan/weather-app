import {useEffect, useState} from "react";
import {useUnitStore} from "./store/unitStore";
import {useThemeStore} from "./store/themeStore";
import {useWeatherStore} from "./store/weatherStore";
import {searchCities, type CityResult} from "./api/api";
import {WeatherCard} from "./components/WeatherCard";
import {ForecastList} from "./components/ForecastList/ForecastList.tsx";
import {DarkModeToggle} from "./components/darkModeToggle/DarkModeToggle.tsx";
import {Loader} from "./components/Loader/Loader.tsx";
import {ErrorMessage} from "./components/ErrorMessage/ErrorMessage.tsx";
import { UnitToggle } from "./components/UnitToggle";
import  {symbols}from "./components/constants.ts"




export default function App() {
    const [query, setQuery] = useState("");
    const [cityResults, setCityResults] = useState<CityResult[]>([]);
    const [isSearchingCities, setIsSearchingCities] = useState(false);
    const unit = useUnitStore((s) => s.unit);
    const setUnit = useUnitStore((s) => s.setUnit);
    const dark = useThemeStore((s) => s.dark);
    const setDark = useThemeStore((s) => s.setDark);
    const {current, forecast, city, loading, error, search} = useWeatherStore();
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const isApiKeyMissing = !apiKey;
    useEffect(() => {
        document.documentElement.className = dark ? "dark" : "";
    }, [dark]);

    // Default Weather
    useEffect(() => {
        if (!city) {
            void search("Barcelona", unit);
        }
    }, [city, unit, search]);

    // for  unit
    useEffect(() => {
        if (!city) return;
        void search(city, unit);
    }, [city, unit]);



    const temperatureSymbol=symbols[unit];

    async function handleSearch(nextCity?: string) {
        const target = (nextCity ?? query).trim();
        if (!target) return;
        await search(target, unit);
        setCityResults([]);
    }

    // Searching cities list
    useEffect(() => {
        if (query === "") {
            setCityResults([]);
            return;
        }
        setIsSearchingCities(true);
        searchCities(query).then((cities) => {
            setCityResults(cities);
            setIsSearchingCities(false);
        }).catch(() => {
            setCityResults([]);
            setIsSearchingCities(false);
        });
    }, [query]);
    return (
        <main className="mx-auto max-w-3xl p-4 sm:p-6 relative">

            <header className="mb-6 flex items-center justify-between gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">Weather App</h1>
                <div className="flex items-center gap-2">
                    <UnitToggle unit={unit} onChange={setUnit}/>
                    <DarkModeToggle dark={dark} onChange={setDark}/>
                </div>
            </header>
            {isApiKeyMissing && (
                <div className="mt-6">
                    <ErrorMessage message="API key is missing."/>
                </div>
            )}
            <div className="flex flex-col gap-2 relative">
                <div className="flex items-center gap-2">
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        onKeyDown={(event) => event.key === "Enter" && handleSearch()}
                        placeholder="Search by city name"
                        disabled={isApiKeyMissing}
                        className="flex-1 rounded-md  border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={() => handleSearch()}
                        disabled={loading || isApiKeyMissing}
                        className="rounded-full bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700  disabled:opacity-60"
                    >
                        {loading || isSearchingCities ? "Searching..." : "Search"}
                    </button>
                </div>

                {cityResults.length > 0 && (
                    <ul className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-lg z-10 max-h-60 overflow-auto">
                        {cityResults.map((city) => (
                            <li
                                key={`${city.name}-${city.lat}-${city.lon}`}
                                className="px-3 py-2 hover:bg-blue-100 dark:hover:bg-blue-700  text-slate-800 dark:text-slate-200"
                                onClick={() => {
                                    setQuery(city.name);
                                    handleSearch(city.name);
                                }}
                            >
                                {city.name}, {city.country}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {loading && (
                <div className="mt-6">
                    <Loader label="Fetching latest weather..."/>
                </div>
            )}
            {error && (
                <div className="mt-6">
                    <ErrorMessage message={error}/>
                </div>
            )}
            {current && (
                <div className="mt-6">
                    <WeatherCard weather={current} unitSymbol={temperatureSymbol}/>
                </div>
            )}
            {forecast.length > 0 && (
                <section className="mt-8">
                    <h2 className="mb-3 text-lg font-medium">Next 5 days</h2>
                    <ForecastList days={forecast} unitSymbol={temperatureSymbol}/>
                </section>
            )}
        </main>
    );
}
