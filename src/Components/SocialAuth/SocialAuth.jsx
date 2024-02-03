import "./SocialAuth.css";
import UseAxios from "../../utils/useAxios";
import { useContext } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Mycontext } from "../../Authcontext/Authcontext";
import { addSocialUser } from "../../utils/addSocialUser";
import { createUser } from "../../utils/createUser";

const SocialAuth = () => {

    const { googleAuthentication, gitHubAuthentication, logOut } = useContext(Mycontext)

    const navigate = useNavigate()
    const address = "/"


    const axios = UseAxios()

    const handleMediaLogin = async (media) => {

        const toastId = toast.loading("Please wait a momment")
        try {
            const { user } = await media()
            if (!user?.email) {
                toast.error("Error", {
                    description: "Your authprovider doesn't have any email"
                })
                return logOut()
            }

            const userObj = {
                userName: user?.displayName,
                userEmai: user?.email,
                status: "active"
            }

            await axios.post("/token", { email: user?.email })
            await createUser(userObj)
            toast.dismiss(toastId)
            toast.success("Success", {
                description: `Welcome ${user?.displayName}`
            })
            navigate(address)
        }

        catch (err) {
            toast.dismiss(toastId)
            toast.error("Something went Wrong")
            console.log(err);
        }


    }

    return (
        <div className="socialAuthContainer">

            <p>Or</p>
            <div className="authProvider" onClick={() => handleMediaLogin(googleAuthentication)}>
                <FaGoogle />
                <p>Google</p>
            </div>
            <div className="authProvider" onClick={() => handleMediaLogin(gitHubAuthentication)}>
                <FaGithub />
                <p>Github</p>
            </div>

        </div >
    );
};

export default SocialAuth;