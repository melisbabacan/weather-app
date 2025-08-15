import type { ForecastListProps } from "./ForecastList";


export function ForecastList({days, unitSymbol}: ForecastListProps) {
    return (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {days.map((day) => (
                <li
                    key={day.date}
                    className="rounded-lg border border-slate-200 bg-white p-4 text-center
                     dark:border-slate-800 dark:bg-slate-800"
                >
                    <div className="text-sm text-slate-500 dark:text-slate-300">
                        {new Date(day.date).toLocaleDateString()}
                    </div>

                    <div className="mt-2 text-lg font-semibold">
                        {Math.round(day.tempMax)}
                        {unitSymbol}
                    </div>


                    <div className="text-sm text-slate-600 dark:text-slate-300">
                        {Math.round(day.tempMin)}
                        {unitSymbol}
                    </div>


                    <div className="mt-1 text-sm text-slate-500 dark:text-slate-300 capitalize">
                        {day.description}
                    </div>
                </li>
            ))}
        </ul>
    );
}
 