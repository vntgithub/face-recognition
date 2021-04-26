import axiosClient from './axiosClinet';
import axios from 'axios';
const userApi = {
    login: async(data) => {
        let res = await axiosClient.post('student/login', data);
        return res.data;
    }
}
export default userApi;