import axios from "axios";

export const uploadImg = async (img) => {
    const form = new FormData()
    form.append("image", img)
    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, form)
    return data
}