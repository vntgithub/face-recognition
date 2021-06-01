import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import classApi from '../api/class.api';
import userApi from '../api/user.api';

export const getClassById = createAsyncThunk(
    'getClassById',
    async (id) => {
        const rsData = await classApi.getById(id);
        const arrId = rsData.data.map(item => item.studentId); 
        const classData = await userApi.getByArrId(arrId);
        const attendList =  rsData.data.map(item => item.lessonAttend)
        return {classData, attendList};
    }
);
const classSlice = createSlice({
    name: 'class',
    initialState: {
        data: [],
        attendList: []
    },
    reducers: {},
    extraReducers: {
        [getClassById.fulfilled]: (state, action) => {
            state.data = action.payload.classData;
            state.attendList = action.attendList;
        }
    }
});

export default classSlice.reducer;