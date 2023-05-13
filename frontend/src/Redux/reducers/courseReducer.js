import   {createReducer} from  '@reduxjs/toolkit'; 


export const courseReducer =  createReducer({  
    courses : []
}, {
    allcoursesRequest : (state) => {
        state.loading = true;
    },
    allcoursesSuccess : (state) => {
        state.loading = false;
        state.courses = action.payload;
    },
    allcoursesFail : (state,action) => {
        state.loading = false;
        state.error = action.payload;
    },
       clearMessage: (state) => {
        state.message = null;
      },
      clearError: (state) => {
        state.error = null;
      },

})