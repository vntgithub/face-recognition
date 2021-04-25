import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './features/user';

const reducer = combineReducers({
    user: userReducer
});
export default configureStore({
    reducer
})