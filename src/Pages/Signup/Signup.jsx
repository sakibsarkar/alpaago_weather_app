import "./Signup.css";
import SocialAuth from "../../Components/SocialAuth/SocialAuth";
import UseAxios from "../../utils/useAxios";
import { updateProfile } from "firebase/auth";
import { useContext, useRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Mycontext } from "../../Authcontext/Authcontext";
import { createUser } from "../../utils/createUser";
import { local_img_url } from "../../utils/local_img_url";
import { uploadImg } from "../../utils/uploadImg";

const Signup = () => {

    const { createAccountWithEmail, logOut, user: mainUser } = useContext(Mycontext)
    const [showPass, setShowPass] = useState(false)
    const [preview, setPreview] = useState("")

    const navigate = useNavigate()

    const axios = UseAxios()

    const adress = "/"

    const fileRef = useRef(null)


    const handleSignup = async (e) => {
        e.preventDefault()
        const form = e.target
        const Fname = form.Fname.value
        const Lname = form.Lname.value
        const photo = fileRef.current.files[0]
        const email = form.email.value
        const password = form.password.value
        const Cpassword = form.Cpassword.value // password confirm

        // regex
        // regex
        const capital = /[A-Z]/;
        const special = /[\W_]/;

        if (password !== Cpassword) {
            return toast.error("Error", {
                description: "Your password didn't matched"
            })
        }

        if (!capital.test(password)) {
            return toast.error("Error", {
                description: "Please use a capital in your password"
            })
        }
        if (!special.test(password)) {
            return toast.error("Error", {
                description: "Please use a special charecter in your password"
            })
        }

        if (!photo) {
            return toast.error("Please select an image for your profile")
        }

        const toastLoader = toast.loading("Please wait a momment")

        try {
            const { user } = await createAccountWithEmail(email, password)
            const { data } = await uploadImg(photo)

            await axios.post("/token", { email: email })

            await updateProfile(user, {
                photoURL: data?.display_url,
                displayName: `${Fname} ${Lname}`
            })

            //user upload func
            const userObj = {
                userName: `${Fname} ${Lname}`,
                Useremail: email,
                status: "active",
            }
            await createUser(userObj)

            toast.dismiss(toastLoader)
            toast.success("Successful", {
                description: `Welcome ${user?.displayName}`
            })
            return navigate(adress)
        }

        catch (err) {
            toast.dismiss(toastLoader)
            if (mainUser) {
                logOut();
            }
            toast.error("Error", {
                description: "Something went Wrong"
            })
            console.log(err);
        }




    }


    const previewImg = async (e) => {
        const file = e.target.files[0]
        const url = await local_img_url(file)
        setPreview(url)
    }

    const selecFile = () => {
        fileRef.current.click()
    }


    return (
        <div className="signupContainer">
            <form onSubmit={handleSignup}>
                <h1>Signup</h1>
                <div className="bro">
                    <input type="text" placeholder="Your first name" name="Fname" required />
                    <input type="text" placeholder="Your last name" name="Lname" required />
                </div>
                <div className="photoFeild" onClick={selecFile}>
                    <input type="file" accept="image/*" placeholder="Your email Adress" name="photo" required onChange={previewImg} className="imgSelector" ref={fileRef} />
                    {
                        preview ? <img src={preview} alt="" /> : ""
                    }
                    {
                        preview ? "" : <div><p>Select Your profile Img</p></div>
                    }
                </div>

                <input type="text" placeholder="Your email Adress" name="email" required />
                <input type={showPass ? "text" : "password"} placeholder="Create your password" name="password" required />
                <div className="eye" onClick={() => setShowPass(!showPass)}>
                    {
                        showPass ?
                            <FiEyeOff /> : <FiEye />
                    }
                </div>
                <input type="password" placeholder="Confirm your password" name="Cpassword" required />
                <button type="submit">Signup</button>

                <SocialAuth />
            </form>
        </div>
    );
};

export default Signup;