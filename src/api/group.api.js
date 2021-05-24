import axiosClient from './axiosClient';

const groupApi = {
    getByCourseId: async (id) => {
        const groups = await axiosClient.get(`group/getbycourseid/${id}`);
        return groups.data;
    },
    add: async (group) => {
        const res = await axiosClient.post('group/add', group);
        return res.data;
    },
    checkNo: async (data) => {
        const res = await axiosClient.post('group/checkno/', data);
        return res.data;
    }, 
    delete: async (id) => {
        await axiosClient.delete(`group/delete/${id}`);
    },
    update: async (group) => {
        await axiosClient.put('group/update', group);
    },
    getById: async (id) => {
        const res = await axiosClient.get(`group/getbyid/${id}`);
        return res.data;
    },
    find: async (str) => {
        const res = await axiosClient.get(`group/findbycode/${str}`);
        return res.data;
    }
}

export default groupApi;