import { configureStore } from '@reduxjs/toolkit';
import { UserReducer } from './reducers/userReducer';


const store = configureStore({
    reducer:{
        user : UserReducer
    }
})

export const server = 'https://learn-by-course-production-1594.up.railway.app/api/v1';

export default store;