
import { configureStore } from '@reduxjs/toolkit';
import { UserReducer } from './Reducers/userReducer';


const store = configureStore({
    reducer:{
        user : UserReducer
    }
})

export const server = 'https://learn-by-course-backend.vercel.app/api/v1';

export default store;