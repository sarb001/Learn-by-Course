import { configureStore } from '@reduxjs/toolkit';
import { useReducer } from './reducers/useReducer';

export const server = "https://learn-by-course-production.up.railway.app/api/v1";

const store = configureStore({
    reducer : {
        user : useReducer
    }
})


export default store;