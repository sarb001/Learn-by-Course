import { server } from "../store";
import  axios from 'axios';


export const createcourse = (formdata) => async(dispatch) => {
    try{
         const config = {
            headers : {
                'Content-type' : "multipart/form-data",
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