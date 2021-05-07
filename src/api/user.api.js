import axiosClient from './axiosClient';
const userApi = {
    login: async(data) => {
        const res = await axiosClient.post('user/login', data);
        return res.data;
    },
    checkCode: async(code) => {
        const res = await axiosClient.get(`user/checkcode/${code}`);
        return res.data;
    },
    checkUsername: async(username) => {
        const res = await axiosClient.get(`user/checkusername/${username}`);
        return res.data;
    },
    create: async (form) => {
        const res = await axiosClient.post('user/add', form);
        return res.data;
    }, 
    loginByToken: async (token) => {
        axiosClient.defaults.headers.common['Authorization'] = token;
        const res = await axiosClient.post('user/loginbytoken')
        return res.data.userInformation;
    }
}
export default userApi;