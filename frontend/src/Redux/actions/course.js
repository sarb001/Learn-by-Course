import { server } from "../store";
import  axios from 'axios';


export const getallcourses = (category = '',keyword = '') => async(dispatch) => {
    try{
          dispatch({ type: "allcoursesRequest" });

          const { data }  = await axios.get(`${server}/allcourses?keyword=${keyword}&category=${category}`);

        dispatch({ type: "allcoursesSuccess"  , payload : data.courses });
        
    }catch(error){
        dispatch({ 
            type: "allcoursesFail" ,
            payload : error.response.data.message });
    }
}


export const getCourseLectures = (id) => async(dispatch) => {
    try{
          dispatch({ type: "getCourseRequest" });
          const { data }  = await axios.get(`${server}/course/${id}` , {
            withCredentials : true,
          });
        dispatch({ type: "getCourseSuccess"  , payload : data.lectures });
        
    }catch(error){
        dispatch({ 
            type: "getCourseFail" ,
            payload : error.response.data.message });
    }
}

