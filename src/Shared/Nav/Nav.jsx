import "./Navbar.css";
import { useContext, useRef } from "react";
import { FaHome } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { Link, NavLink } from "react-router-dom";
import { Mycontext } from "../../Authcontext/Authcontext";

const Navbar = () => {

    const { setCityName } = useContext(Mycontext)






    return (
        <nav>
            <div className="logo">
                <h2 title="logo"><TiWeatherWindyCloudy></TiWeatherWindyCloudy>Alpaago Weather</h2>
            </div>


            <div className="nav_links">
                <NavLink to={'/'}><FaHome /> Home</NavLink>
                <NavLink to={'/manage_user'}><FaUserGear /> Manage User</NavLink>
            </div>



           


            <div className="dynamic_user">
                <div className="login_btn">
                    <Link to={"/login"}>Login</Link>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;