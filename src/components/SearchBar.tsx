import { useState, useEffect } from "react";
import { searchCities, type CityResult } from "../api/api.ts";

type SearchBarProps = {
    value: string;
    onChange: (next: string) => void;
    onSubmit: (cityName: string) => void;
    loading?: boolean;
    disabled?: boolean;
};

export function SearchBar({ value, onChange, onSubmit, loading, disabled }: SearchBarProps) {
    const [results, setResults] = useState<CityResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (value.trim().length < 1) {
            setResults([]);
            return;
        }

        setIsSearching(true);
        searchCities(value)
            .then((cities) => {
                const sorted = [...cities]
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .slice(0, 10);
                setResults(sorted);
            })
            .catch((err) => {
                console.error(err);
                setResults([]);
            })
            .finally(() => setIsSearching(false));
    }, [value]);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") onSubmit(value);
    }

    return (
        <div className="flex flex-col gap-2 relative">
            <div className="flex items-center gap-2">
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search by city name..."
                    disabled={disabled}
                    className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
                <button
                    onClick={() => onSubmit(value)}
                    disabled={loading || disabled}
                    className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700  disabled:opacity-60"
                >
                    {loading || isSearching ? "Searching..." : "Search"}
                </button>
            </div>


            {results.length > 0 && (
                <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-300 rounded-md shadow-lg z-10 max-h-60 overflow-auto">
                    {results.map((city) => (
                        <li
                            key={`${city.name}-${city.lat}-${city.lon}`}
                            className="px-3 py-2 hover:bg-blue-100 "
                            onClick={() => onSubmit(city.name)}
                        >
                            {city.name}, {city.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
