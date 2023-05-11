import { createReducer } from "@reduxjs/toolkit";

export const UserReducer = createReducer(
  {},
  {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },

    // Load User

    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    logoutUserRequest: (state) => {
      state.loading = true;
    },
    logoutUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = action.payload;
    },
    logoutUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    },

    // Register User
    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
  }
);

export const profileReducer = createReducer(
  {},
  {
      updateProfileRequest: (state) => {
        state.loading = true;
      },
      updateProfileSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      updateProfileFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      clearMessage: (state) => {
        state.message = null;
      },
      clearError: (state) => {
        state.error = null;
      },

        // Change from old to new  pass

      changepasswordRequest: (state) => {
        state.loading = true;
      },
      changepasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      changepasswordFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },

      

      forgetpasswordRequest: (state) => {
        state.loading = true;
      },
      forgetpasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      forgetpasswordFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },



      resetpasswordRequest: (state) => {
        state.loading = true;
      },
      resetpasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      resetpasswordFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },


  }
);
