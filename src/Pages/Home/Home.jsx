import "./Home.css";
import WeatherCard from "../../Cards/WeatherCard/WeatherCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useContext, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { Watch } from "react-loader-spinner";
import { toast } from "sonner";
import { Mycontext } from "../../Authcontext/Authcontext";

const Home = () => {


    const inputRef = useRef(null)

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




    const HandleChange = (e) => {
        const value = e.target.value
        const key_code = e.keyCode
        if (key_code === 13) {
            inputRef.current.blur()
            return setCityName(value)
        }

    }

    const searchWeather = () => {
        const value = inputRef.current.value
        setCityName(value)
        inputRef.current.blur()
    }



    // C = K – 273.15
    // const tempInCelCius = Math.ceil((main?.temp - 273.15).toFixed(2))

    return (

        <div className="homeContainer">
            <div className="searchBox">
                <input ref={inputRef} type="text" id="search" placeholder="search your city" onKeyUp={HandleChange} />

                <div className="searchIcon" onClick={searchWeather}>
                    <FiSearch></FiSearch>
                </div>
            </div>
            <WeatherCard isLoading={isLoading} data={data} />
        </div>
    );
};

export default Home;