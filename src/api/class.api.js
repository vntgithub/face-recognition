import axiosClient from './axiosClient';

const classApi = {
    join: async (studentId, classId) => {
        await axiosClient.put('class/join', {studentId, classId})
    },
    leave: async (studentId, classId) => {
        await axiosClient.put('class/leave', {studentId, classId})
    },
    delete: async (id) => {
        await axiosClient.delete(`class/delete/${id}`);
    },
    getById: async (id) => {
        const res = await axiosClient.get(`class/getbyid/${id}`);
        return res.data
    }
}

export default classApi;