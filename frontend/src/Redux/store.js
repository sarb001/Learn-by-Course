
import { configureStore } from '@reduxjs/toolkit';
import { UserReducer, profileReducer, subscriptionreducer } from './Reducers/userReducer';
import { courseReducer } from './reducers/courseReducer';


const store = configureStore({
    reducer:{
        user : UserReducer,
        profile : profileReducer,
        course :  courseReducer,
        subscription : subscriptionreducer
    }
})

export const server = 'https://learn-by-course-backend.vercel.app/api/v1';

export default store;