import { createReducer } from "@reduxjs/toolkit";


export const useReducer =  createReducer({}, {
    loginRequest  : (state,action) =>  {
        state.loading = true;
    },
    loginSuccess  : (state,action) =>  {
        state.loading = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message     
    },
    loginFail  : (state,action) =>  {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },
    clearError : (state,action) => {
        state.error = null;
    },
    clearMessage : () => {
        state.message = null;
    },
})