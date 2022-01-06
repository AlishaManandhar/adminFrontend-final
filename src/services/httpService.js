import axios from "axios"
import { toast } from "react-toastify"


axios.interceptors.response.use(
    res => {
        const msg = res.data
        if ("message" in msg)
        {
            toast.success(msg.message)
        }
        return res.data
    },
    err=> {
            if (err.response.status >= 400)
            {
                return Promise.reject(err)
            }
    }
)

function setToken(token) {
    axios.defaults.headers.common["Authorization"] =  "Bearer " + token;
}

export default  {
    get:axios.get,
    post:axios.post,
    put:axios.put,
    delete: axios.delete,
    setToken
}