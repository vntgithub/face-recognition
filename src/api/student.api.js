import axiosClient from './axiosClient';
const userApi = {
    login: async(data) => {
        const res = await axiosClient.post('student/login', data);
        return res.data;
    },
    checkCode: async(code) => {
        const res = await axiosClient.get(`student/checkcode/${code}`);
        return res.data;
    },
    checkUsername: async(username) => {
        const res = await axiosClient.get(`student/checkusername/${username}`);
        return res.data;
    },
    create: async (form) => {
        const res = await axiosClient.post('/student/add', form);
        return res.data;
    }
}
export default userApi;