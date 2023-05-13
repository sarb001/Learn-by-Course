
import { configureStore } from '@reduxjs/toolkit';
import { UserReducer, courseReducer, profileReducer } from './Reducers/userReducer';


const store = configureStore({
    reducer:{
        user : UserReducer,
        profile : profileReducer,
        course : courseReducer
    }
})

export const server = 'https://learn-by-course-backend.vercel.app/api/v1';

export default store;