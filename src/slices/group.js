import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import groupApi from '../api/group.api';

export const getByCourseId = createAsyncThunk(
    'group/getbycourseid',
    async (courseId) => {
        const data = await groupApi.getByCourseId(courseId);
        return data;
    }
)
export const groupSlice = createSlice({
    name: 'group',
    initialState: {
        data: []
    },
    reducer: {},
    extraReducers: {
        [getByCourseId.fulfilled]: (state, action) => {
            state.data = action.payload;
        }
    } 
});

export default groupSlice.reducer;