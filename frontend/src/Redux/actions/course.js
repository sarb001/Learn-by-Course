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

        const { data }  = await axios.get(`${server}/allcourses` , 
        {category,keyword}, config
        );
        dispatch({ type: "allcoursesSuccess"  , payload : data.message });
        
    }catch(error){
        dispatch({ 
            type: "allcoursesFail" ,  payload : error.response.data.message });
    }

}