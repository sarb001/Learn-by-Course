import { server } from "../store";
import  axios from 'axios';

export const getallcourses = (category = "",keyword = "") => async(dispatch) => {

    try{
        dispatch({ type: "allcoursesRequest" });
        const config = {
                headers : {
                    'Content-Type' : "application/json",
                },
                withCredentials : true,
            }

        const { data }  = await axios.get(`${server}/allcourses?keyword=${keyword}&category=${category}` 
        , config);
        dispatch({ type: "allcoursesSuccess"  , payload : data.courses });
        
    }catch(error){
        dispatch({ 
            type: "allcoursesFail" ,  payload : error.response.data.message });
    }

}