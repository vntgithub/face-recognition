import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        common: {
          'Accept': 'application/json, text/plain, */*'
        },
    }
})
export default axiosClient;