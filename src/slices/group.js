import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import groupApi from '../api/group.api';

export const getByCourseId = createAsyncThunk(
    'group/getbycourseid',
    async (courseId) => {
        const data = await groupApi.getByCourseId(courseId);
        return data;
    }
);
export const addGroup = createAsyncThunk(
    'add',
    async (newGroup) => {
        const data = await groupApi.add(newGroup);
        return data;
    }
);
export const deleteGroup = createAsyncThunk(
    'group/deleteGroup',
    async (data) => {
        await groupApi.delete(data.id);
        return data.index;
    }
);
export const updateGroup = createAsyncThunk(
    'updateGroup',
    async (data) => {
        await groupApi.update(data.group);
        return data;
    }
)
export const groupSlice = createSlice({
    name: 'group',
    initialState: {
        data: []    
    },
    reducer: {
        // selectGroupWantEdit: (state, action) => {
        //     state.groupWantEdit = action.payload;
        // }
    },
    extraReducers: {
        [getByCourseId.fulfilled]: (state, action) => {
            state.data = action.payload;
        },
        [addGroup.fulfilled]: (state, action) => {
            state = state.data.push(action.payload);
        },
        [deleteGroup.fulfilled]: (state, action) => {
            const index = action.payload;
            let newGroups = [...state.data];
            newGroups.splice(index, 1);
            state.data = newGroups;
        },
        [updateGroup.fulfilled]: (state, action) => {
            const index = action.payload.index;
            const grourpUpdated = action.payload.group;
            let newGroups = [...state.data];
            newGroups.splice(index, 1, grourpUpdated);
            state.data = newGroups;
        }
    } 
});

export const { selectGroupWantEdit } = groupSlice.actions;
export default groupSlice.reducer;