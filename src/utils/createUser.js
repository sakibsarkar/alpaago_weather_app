import UseAxios from "./useAxios";
import { todayDate } from "./todayDate";

export const createUser = async (userData) => {
    const today = todayDate()
    const userObj = {
        ...userData,
        date: today
    }

    const axios = UseAxios()
    try {
        const result = await axios.post("/add_user", userObj)
        return result
    }

    catch (err) {
        throw new Error(err)
    }
}