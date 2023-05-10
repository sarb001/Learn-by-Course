import { server } from "../store";
import  axios from 'axios';

export const  updateProfile = (name,email) => async(dispatch) => 
{
    try{
        dispatch({ type: "updateProfileRequest" });
        
        const { data }  = await axios.put(`${server}/updateprofile` , 
        { name,email}, 
        {
            headers : {
                'Content-Type' : "application/json",
            },
            withCredentials : true,
        });
        dispatch({ type: "updateProfileSuccess"  , payload : data.message });
        
    }catch(error){
        dispatch({ 
            type: "updateProfileFail" , 
            payload : error.response.data.message });
    }
}

export const  changePassword = (oldPassword,newPassword) => async(dispatch) => 
{
    try{
        dispatch({ type: "changepasswordRequest" });
        const { data }  = await axios.put(`${server}/changepassword` , 
        { oldPassword,newPassword} , 
        {
            headers : {
                'Content-Type' : "application/json",
            },
            withCredentials : true,
        });
        dispatch({ type: "changepasswordSuccess"  , payload : data.message });
        
    }catch(error){
        dispatch({ 
            type: "changepasswordFail" , 
            payload : error.response.data.message });
    }
}