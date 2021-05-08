import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './slices/user';
import courseReducer from './slices/course';

const reducer = combineReducers({
    user: userReducer,
    course: courseReducer
});
export default configureStore({
    reducer
})