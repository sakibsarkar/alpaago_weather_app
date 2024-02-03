import "./Navbar.css";
import { useContext } from "react";
import { FaHome } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { Link, NavLink } from "react-router-dom";
import { Mycontext } from "../../Authcontext/Authcontext";

const Navbar = () => {
    const { user } = useContext(Mycontext)
    const userImg = user?.photoURL || "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
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
                {
                    user ?
                        <div className="useBox">
                            <div className="display_img">
                                <img src={userImg} alt="" />
                            </div>
                            <p>{user?.displayName}</p>
                        </div>
                        :
                        <div className="login_btn">
                            <Link to={"/login"}>Login</Link>
                            <p>|</p>
                            <Link to={"/login"}>Signup</Link>
                        </div>
                }
            </div>

        </nav>
    );
};

export default Navbar;