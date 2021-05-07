import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import courseApi from '../api/course.api';

export const getCourse = createAsyncThunk(
    'course/get',
    async (teacherId) => {
        const courses = await courseApi.get(teacherId);
        return courses;
    }
);
export const addCourse = createAsyncThunk(
    'course/add',
    async (course) => {
        await courseApi.add(course);
        return course;
    }
);

export const courseSlice = createSlice({
    name: 'course',
    initialState: [],
    reducers: {},
    extraReducers: {
        [getCourse.fulfilled]: (state, action) => {
            state =  action.payload;
        },
        [addCourse.fulfilled]: (state, action) => {
            state.push(action.payload);
        }
    }

});

export default courseSlice.reducer;