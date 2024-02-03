import "./Header.css";
import { useContext, useRef, useState } from "react";
import { BsFacebook, BsGlobe2 } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { Mycontext } from "../../Authcontext/Authcontext";

const Navbar = () => {

    const { setCityName } = useContext(Mycontext)
    const inputRef = useRef(null)

    const [boolen, setBoolen] = useState(false)
    const [url, setUrl] = useState("https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png")
    function hover() {
        setUrl("https://i.ibb.co/NmDPbLf/c-Ie5-Mv-Dv-X4-Vc.gif")
    }
    function mouseOut() {
        setUrl("https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png")
    }

    const [time, setTime] = useState("")

    setInterval(() => {
        let hour = new Date().getHours()
        hour = hour < 10 ? "0" + hour : hour
        let minute = new Date().getMinutes()
        minute = minute < 10 ? "0" + minute : minute
        let second = new Date().getSeconds()
        second = second < 10 ? "0" + second : second
        let currentTime = `${hour} : ${minute} : ${second}`
        // console.log(currentTime)
        setTime(currentTime)
    }, 1000)

    function showLinks() {
        setBoolen(true)
    }
    function hideLinks() {
        setBoolen(false)
    }

    const HandleChange = (e) => {
        const value = e.taget.value
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
                <h2 title="logo"><TiWeatherWindyCloudy></TiWeatherWindyCloudy>NiceDay</h2>
            </div>
            <div className="searchBox">
                <input ref={inputRef} type="text" id="search" placeholder="search your city" onKeyUp={HandleChange} />

                <div className="searchIcon" onClick={searchWeather}>
                    <FiSearch></FiSearch>
                </div>
            </div>

            <div className="corner">
                <div className="time">
                    <p>{time}</p>
                </div>
                <div className="author">
                    <div className="linkContainer">
                        <img onMouseEnter={showLinks} src="https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg" alt="" />
                        <div className={boolen ? "links" : "hide"} onMouseLeave={hideLinks}>
                            <div className="cross" onClick={hideLinks}><RxCross2></RxCross2></div>
                            <a href="https://www.facebook.com/Lwda.Bc" rel="noreferrer" target="_blank" className="anchorFB"><BsFacebook className="linkIcon"></BsFacebook>Facebook</a>
                            <a href="https://wa.link/t6vmuf" rel="noreferrer" target="_blank" className="anchorWP"><IoLogoWhatsapp className="linkIcon"></IoLogoWhatsapp>Watsapp</a>
                            <a href="" rel="noreferrer" target="_blank" className="anchorPF"><BsGlobe2 className="linkIcon"></BsGlobe2>Protfolio</a>
                        </div>

                    </div>
                    <a href="https://github.com/sakibsarkar" target="_blank" rel="noreferrer" className="gitHub" onMouseEnter={hover} onMouseLeave={mouseOut}><img src={url} alt="" /></a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;