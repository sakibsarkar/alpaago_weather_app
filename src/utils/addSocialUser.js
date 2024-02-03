import UseAxios from "./useAxios";

export const addSocialUser = async (user = {}) => {
    const axios = UseAxios()
    const userObj = {
        user_email: user?.email,
        user_name: user?.displayName,
        role: "user"
    }
    const { data } = axios.post("/add/user", userObj)
    return data
}