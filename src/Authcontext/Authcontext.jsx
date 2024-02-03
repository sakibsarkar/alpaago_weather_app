import auth from "../firebase-config/firebase_config";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const Mycontext = createContext(null)

const Authcontext = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [waitForUser, setWaitForUser] = useState(true)
    const [cityName, setCityName] = useState("dhaka")
    const [naviGateLocation, setNaviGateLocation] = useState("")//it will be use in register page we will set the value from log in page



    const googleAuthentication = () => {
        setLoading(true)
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }


    const gitHubAuthentication = () => {
        setLoading(true)
        const provider = new GithubAuthProvider()
        return signInWithPopup(auth, provider)
    }

    const logOut = () => {
        return signOut(auth)
    }

    const loginWithEmail = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const createAccountWithEmail = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {

        onAuthStateChanged(auth, (USER) => {
            setUser(USER)
            setLoading(false)

        })

    }, [waitForUser])


    const items = {
        loading,
        googleAuthentication,
        gitHubAuthentication,
        setWaitForUser,
        user,
        logOut,
        loginWithEmail,
        createAccountWithEmail,
        naviGateLocation,
        setNaviGateLocation,
        cityName,
        setCityName
    }
    return (
        <Mycontext.Provider value={items}>
            {children}
        </Mycontext.Provider>
    );
};

export default Authcontext;