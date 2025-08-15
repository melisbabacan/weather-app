import type {DarkModeToggleProps} from "./DarkModeToggle.ts";

export function DarkModeToggle({dark, onChange}: DarkModeToggleProps) {
    return (
        <button
            onClick={() => onChange(!dark)}
            className="rounded-md border border-slate-300 bg-white px-3 py-1 text-sm dark:border-slate-700 dark:bg-slate-800"
            title="Toggle dark mode"
        >
            {dark ? "Light" : "Dark"}
        </button>
    );
}
