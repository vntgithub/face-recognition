import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import classApi from '../api/class.api';
import userApi from '../api/user.api';

export const getClassById = createAsyncThunk(
    'getClassById',
    async (id) => {
        const classRS = await classApi.getById(id);
        const arrId = classRS.data.map(item => item.studentId); 
        const data = await userApi.getByArrId(arrId);
        const attendList =  classRS.data.map(item => item.lessonAttend)
        return {data, attendList};
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
            state.data = action.payload.data;
            state.attendList = action.payload.attendList;
        }
    }
});

export const { updateClass } = classSlice.actions;
export default classSlice.reducer;