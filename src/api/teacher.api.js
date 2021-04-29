import axiosClient from './axiosClient';

const teacherApi = {
    login: async (data) => {
        const res = await axiosClient.post('teacher/login', data);
        return res.data;
    },
    create: async (dataForm) => {
        const res = await axiosClient.post('teacher/add', dataForm);
        return res.data;
    }
}

export default  teacherApi;