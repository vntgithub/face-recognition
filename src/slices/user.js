import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../api/user.api';


export const login = createAsyncThunk(
    'user/login',
    async (data) => {
        const resData = await userApi.login(data);
        return resData;
    }
);
export const loginByToken = createAsyncThunk(
    'user/loginbytoken',
    async (token) => {
        const resData = userApi.loginByToken(token);
        return resData;
    }
)



export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: {},
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
            state.userData = action.payload.userInformation;
        },
        [loginByToken.pending]: (state) => {
            state.loading = true;
        },
        [loginByToken.rejected]: (state, action) => {
            state.loading = false;
            state.err = action.err;
        },
        [loginByToken.fulfilled]: (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        }
    }
});
//export const { signin, signup, logout } = studentSlice.actions;
export default userSlice.reducer;
