import axiosClient from './axiosClient';

const teacherApi = {
    login: async (data) => {
        const res = await axiosClient.post('teacher/login', data);
        return res.data;
    },
    create: async (dataForm) => {
        const res = await axiosClient.post('teacher/add', dataForm);
        return res.data;
    },
    checkCode: async(code) => {
        const res = await axiosClient.get(`teacher/checkcode/${code}`);
        return res.data;
    },
    checkUsername: async(username) => {
        const res = await axiosClient.get(`teacher/checkusername/${username}`);
        return res.data;
    },
}

export default  teacherApi;