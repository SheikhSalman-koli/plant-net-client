import axios from "axios"

export const uploadImage = async(image) => {
    const formData = new FormData()
    formData.append('image', image)
    const {data} =await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_UPLOAD_KEY}`,formData)
    return data.data.display_url
}

// useAxiosSecure could not use, because it is a js file

export const saveUserData = async(userData) => {
    await axios.post(`${import.meta.env.VITE_API_URL}/users`, 
    userData )
}