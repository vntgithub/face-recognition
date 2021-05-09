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
        const newCourse = await courseApi.add(course);
        return newCourse;
    }
);
export const deleteCourse = createAsyncThunk(
    'course/delete',
    async (data) => {
        await courseApi.delete(data.id);
        return data.index;
    }
);
export const updateCourse = createAsyncThunk(
    'course/update',
    async (data) => {
        await courseApi.update(data.course);
        return data;
    }
)
export const courseSlice = createSlice({
    name: 'course',
    initialState: {
        data: []
    },
    reducers: {},
    extraReducers: {
        [getCourse.fulfilled]: (state, action) => {
            state.data =  action.payload;
        },
        [addCourse.fulfilled]: (state, action) => {
            state.data.push(action.payload);
        },
        [deleteCourse.fulfilled]: (state, action) => {
            const index = action.payload;
            state.data.splice(index, 1);
        },
        [updateCourse.fulfilled]: (state, action) => {
            state.data.splice(
                action.payload.index,
                1,
                action.payload.course
            )
        }
    }

});
export default courseSlice.reducer;