
import { configureStore } from '@reduxjs/toolkit';
import { UserReducer, profileReducer, subscriptionreducer } from './reducers/userReducer';
import { courseReducer } from './reducers/courseReducer';
import { adminReducer } from './reducers/adminReducer';


const store = configureStore({
    reducer:{
        user :      UserReducer,
        profile : profileReducer,
        course :  courseReducer,
        subscription : subscriptionreducer,
        admin : adminReducer
    }
})

export const server = 'https://learn-by-course-backend.vercel.app/api/v1';

export default store;