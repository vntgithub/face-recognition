import axiosClient from './axiosClient';

const student_groupApi = {
    getByStudentId: async (studentId) => {
        const res = await axiosClient.get(`student_group/getbystudentid/${studentId}`);
        return res.data;
    },
    join: async (data) => {
        await axiosClient.put('student_group/join', data);
    },
    leave: async (data) => {
        await axiosClient.put('student_group/leave', data);
    },
    add: async (id) => {
        await axiosClient.post('student_group/add', {id: id});
    }
} 

export default student_groupApi