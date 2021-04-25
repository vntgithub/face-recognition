import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        exist: false,
        data: {}
    },
    reducers: {
        signin: (state) => {
            console.log(state);
        },
        signup: () => {

        },
        logout: () => {

        },

    }
});
export const { signin, signup, logout } = userSlice.actions;
export default userSlice.reducer;