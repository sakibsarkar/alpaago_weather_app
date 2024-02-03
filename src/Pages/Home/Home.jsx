import "./Home.css";
import WeatherCard from "../../Cards/WeatherCard/WeatherCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Watch } from "react-loader-spinner";
import { toast } from "sonner";
import { Mycontext } from "../../Authcontext/Authcontext";

const Home = () => {

    const { cityName, setCityName } = useContext(Mycontext)
    const { data = {}, isLoading } = useQuery({
        queryKey: ['weatherData', cityName],
        queryFn: async () => {
            try {
                const { data: weatherData } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4af0a8ed4d6e6271c0d441d472d939c4`)

                return weatherData
            }
            catch (err) {
                console.log(err);
                toast.error(`Couldn't find data for "${cityName}"`)
                setCityName("dhaka")
                return {}
            }
        }
    })


    // C = K – 273.15
    // const tempInCelCius = Math.ceil((main?.temp - 273.15).toFixed(2))

    return (

        <div className="homeContainer">
            <WeatherCard isLoading={isLoading} data={data} />
        </div>
    );
};

export default Home;