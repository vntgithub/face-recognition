import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import studentApi from '../api/student.api';
import teacherApi from '../api/student.api';


export const login = createAsyncThunk(
    'user/login',
    async (dataLogin, position) => {
        if(position === 'student'){
            const data = await studentApi.login(dataLogin);
            return data;
        }else{
            const data = await teacherApi.login(dataLogin);
            return data;
        }
        
    }
);
// export const create = createAsyncThunk(
//     'user/create',
//     async (dataForm, position) => {
//         if(position === 'student'){
//             const data = await studentApi.create(dataForm);
//             return data;
//         }else{
//             const data = await teacherApi.create(dataForm);
//             return data;
//         }
//     }
    
// )


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
        },
        // [create.loading]: (state) => {
        //     state.loading = true;
        // },
        // [create.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.err = action.err;
        // },
        // [create.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     state.dataStudent = action.payload;
        // }
    }
});
//export const { signin, signup, logout } = studentSlice.actions;
export default studentSlice.reducer;
