import type {ErrorMessageProps} from "./ErrorMessage.ts";

export function ErrorMessage({message}: ErrorMessageProps) {
    return (
        <div
            className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-red-800 dark:border-red-700 dark:bg-red-900/30 dark:text-red-200">
            {message}
        </div>
    );
}
