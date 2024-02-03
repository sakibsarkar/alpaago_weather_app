import "./Navbar.css";
import { FaHome } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                <h2 title="logo"><TiWeatherWindyCloudy></TiWeatherWindyCloudy>Alpaago Weather</h2>
            </div>


            <div className="nav_links">
                <NavLink to={'/'}><FaHome /> Home</NavLink>
                <NavLink to={'/manage_user'}><FaUserGear /> Manage User</NavLink>
            </div>


            <div className="dynamic">
                <div className="login_btn">
                    <Link to={"/login"}>Login</Link>
                    <p>|</p>
                    <Link to={"/login"}>Signup</Link>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;