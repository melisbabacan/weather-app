import type {CurrentWeather} from "../api/api";
type WeatherCardProps = {
    weather: CurrentWeather;
    unitSymbol: string;
};

export function WeatherCard({weather, unitSymbol}: WeatherCardProps) {

    const getBackgroundImage = (description: string) => {
        const desc = description.toLowerCase();

        if (desc.includes("cloud")) {
            return "https://miro.medium.com/1*GsImz-edoeuqCMfKxDus0w.jpeg";
        }
        if (desc.includes("rain")) {
            return "https://media.istockphoto.com/id/1257951336/photo/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept.jpg?s=612x612&w=0&k=20&c=lNvbIw1wReb-owe7_rMgW8lZz1zElqs5BOY1AZhyRXs=";
        }
        if (desc.includes("snow")) {
            return "https://wmo.int/sites/default/files/2025-02/Snow%20Feature%20Image.jpg";
        }
        if (desc.includes("sun")) {
            return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7kVhhQNhTR0YPQylH2jr63_E2E1KxygZMJg&s";
        }
        if (desc.includes("storm")) {
            return "https://t3.ftcdn.net/jpg/04/09/38/88/360_F_409388878_YWjMLSwp6YJm833AclWTqQIF0ZtHbWlz.jpg";
        }
    };

    const backgroundImage = getBackgroundImage(weather.description);

    return (
        <div
            className="relative rounded-xl border border-slate-200 p-5 shadow-sm overflow-hidden"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="mb-1 text-sm text-white/80">
                Current weather
            </div>
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <div className="text-2xl font-semibold text-white">
                        {weather.city}, {weather.country}
                    </div>
                    <div className="mt-1 text-white/90">
                        {weather.description}
                    </div>
                </div>
                <div className="text-4xl font-bold text-white">
                    {Math.round(weather.temperature)}
                    {unitSymbol}
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                <div className="rounded-md bg-white/20 backdrop-blur-sm p-3 border border-white/30">
                    <div className="text-white/80">Feels like</div>
                    <div className="font-medium text-white">
                        {Math.round(weather.feelsLike)}
                        {unitSymbol}
                    </div>
                </div>
                <div className="rounded-md bg-white/20 backdrop-blur-sm p-3 border border-white/30">
                    <div className="text-white/80">Humidity</div>
                    <div className="font-medium text-white">{weather.humidity}%</div>
                </div>
                <div className="rounded-md bg-white/20 backdrop-blur-sm p-3 border border-white/30">
                    <div className="text-white/80">Wind</div>
                    <div className="font-medium text-white">
                        {Math.round(weather.windSpeed)} {weather.windUnit}
                    </div>
                </div>
                <div className="rounded-md bg-white/20 backdrop-blur-sm p-3 border border-white/30">
                    <div className="text-white/80">Clouds</div>
                    <div className="font-medium text-white">{weather.clouds}%</div>
                </div>
            </div>
        </div>
    );
}
