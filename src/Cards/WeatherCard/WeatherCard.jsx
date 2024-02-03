import "./WeatherCard.css";
import Loader from "../../Components/Loader/Loader";
import Wave from "react-wavify";
import { BsArrowDown, BsArrowUp, BsDropletHalf, BsSpeedometer2, BsThermometerHalf } from "react-icons/bs";
import { FiWind } from "react-icons/fi";
import { TbWorldLatitude, TbWorldLongitude } from "react-icons/tb";
import { tempInCelCius, tempInFahrenheit } from "../../utils/Converter";

const WeatherCard = ({ isLoading, data = {} }) => {
    const { main, wind, coord, name, sys } = data

    return (
        <div className="container">
            {
                isLoading ?
                    <Loader />

                    :

                    <>
                        <div className="top">
                            <div className="left" title="Atmosphere pressure"><p className="icon-center"><BsSpeedometer2></BsSpeedometer2>{main ? main.pressure : 0}hPa</p></div>
                            <div className="mid" title="Wind Speed"><p className="icon-center"><FiWind></FiWind>{wind ? wind.speed : 0} km/h</p></div>
                            <div className="right" title="Humidity"><p className="icon-center"><BsDropletHalf></BsDropletHalf>{main ? main.humidity : 0}%</p></div>
                        </div>

                        <div className="temp">
                            <div className="flex-container">
                                <BsThermometerHalf className="thermoMeter"></BsThermometerHalf>
                                <p className="celcius">{tempInCelCius(main ? main.temp : 273)}<sup>&#176;C</sup></p>
                                <p className="fahrenheit">| {tempInFahrenheit(main ? main.temp : 273)} <sup>°F</sup></p>
                            </div>
                            <div className="hero-box">
                                <div>
                                    <p className="ctnry">Country - {sys?.country}</p>
                                    <p className="city">{name}</p>
                                </div>
                                <div className="min-max">
                                    <p><BsArrowUp></BsArrowUp> Max temp - {tempInCelCius(main ? main.temp_max : 273)} <sup>°C</sup> | {tempInFahrenheit(main ? main.temp_max : 273)}<sup>°F</sup></p>
                                    <p><BsArrowDown></BsArrowDown> Min temp - {tempInCelCius(main ? main.temp_min : 273)} <sup>°C</sup> | {tempInFahrenheit(main ? main.temp_min : 273)} <sup>°F</sup></p>
                                </div>

                            </div>
                        </div>

                        <div className="bottom">
                            <div>
                                {/* longitude and latitude */}
                                <p className="icon-center"><TbWorldLongitude></TbWorldLongitude>Longitude - {coord?.lon}</p>
                                <p className="icon-center"><TbWorldLatitude></TbWorldLatitude> Latitude - {coord?.lat}</p>

                            </div>

                        </div>
                        <div className="wave">
                            <Wave fill="url(#gradient)" options={{
                                height: 30,
                                amplitude: 40,
                                speed: 0.3,
                                points: 3
                            }}>
                                <defs>
                                    <linearGradient id="gradient" gradientTransform="rotate(100)">
                                        <stop offset="10%" stopColor="#3ED4F3" />
                                        <stop offset="90%" stopColor="#1915FE" />
                                    </linearGradient>
                                </defs>
                            </Wave>


                        </div>
                    </>








            }

        </div>
    );
};

export default WeatherCard;