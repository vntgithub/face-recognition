import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './slices/user';
import courseReducer from './slices/course';
import groupReducer from './slices/group';
import classReducer from './slices/class';

const reducer = combineReducers({
    user: userReducer,
    course: courseReducer,
    group: groupReducer,
    class: classReducer
});
export default configureStore({
    reducer
})