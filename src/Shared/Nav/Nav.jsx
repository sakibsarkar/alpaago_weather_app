import "./Navbar.css";
import { useContext, useRef } from "react";
import { FaHome } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { Mycontext } from "../../Authcontext/Authcontext";

const Navbar = () => {

    const { setCityName } = useContext(Mycontext)
    const inputRef = useRef(null)



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


    return (
        <nav>
            <div className="logo">
                <h2 title="logo"><TiWeatherWindyCloudy></TiWeatherWindyCloudy>Alpaago Weather</h2>
            </div>


            <div className="nav_links">
                <NavLink to={'/'}><FaHome /> Home</NavLink>
                <NavLink to={'/manage_user'}><FaUserGear /> Manage User</NavLink>
            </div>



            <div className="searchBox">
                <input ref={inputRef} type="text" id="search" placeholder="search your city" onKeyUp={HandleChange} />

                <div className="searchIcon" onClick={searchWeather}>
                    <FiSearch></FiSearch>
                </div>
            </div>


        </nav>
    );
};

export default Navbar;