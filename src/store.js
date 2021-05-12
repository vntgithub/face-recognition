import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './slices/user';
import courseReducer from './slices/course';
import groupReducer from './slices/group';

const reducer = combineReducers({
    user: userReducer,
    course: courseReducer,
    group: groupReducer
});
export default configureStore({
    reducer
})