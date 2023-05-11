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

// old to new 

export const  changePassword = (oldPassword,newPassword) => async(dispatch) => 
{
    try{
        dispatch({ type: "changepasswordRequest" });
        const { data }  = await axios.put(`${server}/changepassword` , 
        {oldPassword,newPassword} , 
        {
            headers : {
                'Content-Type' : "application/json",
            },
            withCredentials : true,
        });
        console.log('changepasss -',data);
        dispatch({ type: "changepasswordSuccess"  , payload : data.message });
        
    }catch(error){
        dispatch({ 
            type: "changepasswordFail" , 
            payload : error.response.data.message });
    }
}


export const forgetpassword = (email) => async(dispatch) => {
    try{
        dispatch({type:"forgetpasswordRequest"})
        const config = {
            headers: {
              'Content-type': 'application/json',
            },
      
            withCredentials: true,
          };
      
          const { data } = await axios.post(
            `${server}/forgetpassword`,{ email }, config
          );
      
        dispatch({type:"forgetpasswordSuccess" ,payload : data.message })
        
    }catch(error){
        dispatch({
            type:"forgetpasswordFail",
            payload : error.response.data.message })
    }
}


export const resetpassword = (token,password) => async(dispatch) => {
    try{
        dispatch({type:"resetpasswordRequest"})
        const config = {
            headers: {
              'Content-type': 'application/json',
            },
      
            withCredentials: true,
          };
      
          const { data } = await axios.put(
            `${server}/resetpassword/${token}`,{ password }, config
          );      
        dispatch({type:"resetpasswordSuccess" ,payload : data.message })
        
    }catch(error){
        dispatch({
            type:"resetpasswordFail",
            payload : error.response.data.message })
    }

}