import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../api/student.api';

export const login = createAsyncThunk(
    'user/login',
    async (dataLogin) => {
        const data = await userApi.login(dataLogin);
        return data
    }
);

export const userSlice = createSlice({
    name: 'user',
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
export const { signin, signup, logout } = userSlice.actions;
export default userSlice.reducer;