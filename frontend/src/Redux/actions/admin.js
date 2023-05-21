import { server } from "../store";
import  axios from 'axios';


export const createcourse = (formdata) => async(dispatch) => {
    try{
         const config = {
            headers : {
                'Content-Type' : "application/json"
            },
            withCredentials : true,
         }

         dispatch({type:"createCourseRequest"});
         const { data } =  await axios.post(`${server}/createcourse` ,
         formdata ,
          config );

         dispatch({type:"createCourseSuccess",payload : data.message })

    }catch(error){
        dispatch({ 
            type: "createCourseFail" , payload : error.response.data.message });
    }

}

export const deletecourse = (id) => async(dispatch) => {
    try{
         const config = {
            withCredentials : true,
         }

         dispatch({type:"deleteCourseRequest"});
         const { data } =  await axios.delete(`${server}/course/${id}` ,
          config );

         dispatch({type:"deleteCourseSuccess",payload : data.message })

    }catch(error){
        dispatch({ 
            type: "deleteCourseFail" ,payload : error.response.data.message });
    }

}


export const  addLecture   = (id,formdata) => async(dispatch) => {
    try{
        
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
            withCredentials: true,
        };

        dispatch({type:"addLectureRequest"});
        const { data } =  await axios.post(`${server}/course/${id}` ,
         formdata,
         config );

        dispatch({type:"addLectureSuccess",payload : data.message })

    }catch(error){
        dispatch({ 
            type: "addLectureFail" ,payload : error.response.data.message });
    }
}


export const  deleteLecture = () => async(dispatch) => {
    try{
        dispatch({type:"deleteLectureRequest"});
        const { data } =  await axios.delete(`${server}/lecture` );

        dispatch({type:"deleteLectureSuccess",payload : data.message })

    }catch(error){
        dispatch({ 
            type: "deleteLectureFail" ,payload : error.response.data.message });
    }
}