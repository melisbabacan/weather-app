import type {ForecastDay} from "../../api/api.ts";

export type ForecastListProps = {
    days: ForecastDay[];
    unitSymbol: string;
};