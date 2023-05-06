import { createReducer } from "@reduxjs/toolkit";

export const UserReducer = createReducer({},{
    loginRequest : (state) =>  {
            state.loading = true
    },
    loginSuccess : (state,action) =>  {
        state.loading = false;
        state.isAuthenticated = true;
        state.user =    action.payload.user;
        state.message = action.payload.message;
    },
    loginFail : (state,action) =>  {
        state.loading = true
        state.isAuthenticated = false;
        state.error = action.payload ;
    },
    clearMessage : (state) => {
        state.message = null;
    },
    clearError : (state) => {
        state.error = null;
    }
})