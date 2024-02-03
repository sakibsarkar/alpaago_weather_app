import "./Loader.css";
import { MagnifyingGlass } from "react-loader-spinner";

const Loader = () => {
    return (

        <div className="mrLoader">
            <img className="cloud" src="https://i.ibb.co/gF58pXD/png-transparent-angry-cloud-emoticon-smiley-thunder-weather-weather-emoticon-icon-removebg-preview.png" alt="" />
            <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{

                    position: "absolute",
                    top: "290px"
                }}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor='#c0efff'
                color='#e15b64'
            />
        </div>

    );
};

export default Loader;