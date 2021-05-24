import axiosClient from './axiosClient';

const classApi = {
    join: async (studentId, classId) => {
        await axiosClient.put('class/join', {studentId, classId})
    }
}

export default classApi;