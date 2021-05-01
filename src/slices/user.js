import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import studentApi from '../api/student.api';
import teacherApi from '../api/teacher.api';


export const login = createAsyncThunk(
    'user/login',
    async (form) => {
        if(form.position === 'student'){
            const data = await studentApi.login(form.data);
            return data;
        }else{
            const data = await teacherApi.login(form.data);
            return data;
        }
    }
);



export const studentSlice = createSlice({
    name: 'student',
    initialState: {
        dataUser: {},
        loading: false,
        err: ''
    },
    reducers: {},
    extraReducers: {
        [login.pending]: (state) => {
            state.loading = true;
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.err = action.err;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            state.dataUser = action.payload;
        }
    }
});
//export const { signin, signup, logout } = studentSlice.actions;
export default studentSlice.reducer;
