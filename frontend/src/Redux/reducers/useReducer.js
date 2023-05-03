import { createReducer } from "@reduxjs/toolkit";

export const useReducer =  createReducer({}, {

    loginRequest  : (state,action) =>  {
        state.loading = true;
    },
    loginSuccess  : (state,action) =>  {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message     
    },
    loginFail  : (state,action) =>  {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload.error;
    },
    clearError : (state,action) => {
        state.error = null;
    },
    clearMessage : (state) => {
        state.message = null;
    },


    // loadUserRequest  : (state,action) =>  {
    //     state.loading = true;
    // },
    // loadUserSuccess  : (state,action) =>  {
    //     state.loading = false;
    //     state.isAuthenticated = true;
    //     state.user = action.payload;    
    // },
    // loadUserFail  : (state,action) =>  {
    //     state.loading = false;
    //     state.isAuthenticated = false;
    //     state.error = action.payload.error;
    // },




    // signupRequest : (state) => {
    //     state.loading = true; 
    // },  
    // signupSuccess  : (state,action) => {
    //     state.loading = false;
    //     state.isAuthenticated = true;
    //     state.user = action.payload.user;
    //     state.message = action.payload.message     
    // },
    // signupFail  : (state,action) =>  {
    //     state.loading = false;
    //     state.isAuthenticated = false;
    //     state.error = action.payload.error;
    // },


})