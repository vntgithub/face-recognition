import axiosClient from './axiosClient';

const courseApi = {
    add: async (course) => {
        const res = await axiosClient.post('course/add', course);
        return res.data;
    },
    get: async (teacherId) => {
        const res = await axiosClient.get(`course/getbyteacherid/${teacherId}`);
        return res.data;
    },
    checkCode: async (code) => {
        const res = await axiosClient.get(`course/checkcode/${code}`);
        return res.data;
    }
}
export default courseApi;