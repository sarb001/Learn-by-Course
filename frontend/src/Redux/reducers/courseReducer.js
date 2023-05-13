import   {createReducer} from  '@reduxjs/toolkit'; 


export const courseReducer =  createReducer(
    { courses : [] }, {
    allcoursesRequest : (state) => {
        state.loading = true;
    },
    allcoursesSuccess : (state,action) => {
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

      addToPlaylistRequest: state => {
        state.loading = true;
      },
      addToPlaylistSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      addToPlaylistFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
})