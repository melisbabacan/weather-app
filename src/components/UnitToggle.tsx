import type {Unit} from"../api/api";

 type UnitToggleProps = {
    unit: Unit;
    onChange: (unit: Unit) => void;
};

export function UnitToggle({unit, onChange}: UnitToggleProps) {
    const isMetric = unit === "metric";
    return (
        <div
            className="inline-flex items-center rounded-md border border-slate-300 p-1 dark:border-slate-700"
            role="group"
            aria-label="Temperature unit toggle"
        >
            <button
                onClick={() => onChange("metric")}
                className={`rounded px-3 py-1 text-sm ${
                    isMetric
                        ? "bg-blue-600 text-white"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
            >
                °C
            </button>
            <button
                onClick={() => onChange("imperial")}
                className={`rounded px-3 py-1 text-sm ${
                    !isMetric
                        ? "bg-blue-600 text-white"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
            >
                °F
            </button>
        </div>
    );
}