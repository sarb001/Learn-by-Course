import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './Reducers/userReducer';


const store = configureStore({
    reducer:{
        user : userReducer
    }
})

export const server = 'https://learn-by-course-production-1594.up.railway.app/api/v1';

export default store;