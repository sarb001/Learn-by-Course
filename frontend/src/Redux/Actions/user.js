import { server } from "../store";

import  axios from 'axios';

export const login = (email,password) => async(dispatch) => {
    try{
        dispatch({ type: "loginRequest" });
        const {data} = await axios.post(`${server}/login` , {email,password} , {
            headers : {
                'Content-type' : "application/json",
            },
            withCredentials : true,
        })
        console.log('login data --',data);
        dispatch({type: 'loginSuccess' , payload : data})

    }catch(error){
        console.log('Login Error is -',error);
        dispatch({ type:"loginFail" , payload : error.response.data.message });
    }
}

export const loaduser = () => async(dispatch) => {
    try{
        dispatch({ type: "loadUserRequest" });

        const {data} = await axios.get(`${server}/getmyprofile` , 
        {   
            withCredentials : true,
        })
        
        console.log(' Load data --',data);
        dispatch({type: 'loadUserSuccess' , payload : data.user })
    }catch(error){
        console.log(' Load  Error is -',error);
        dispatch({ type:"loadUserFail" , payload : error.response.data.message });
    }
}


export const register = formdata => async(dispatch) => {
    try{
        dispatch({ type: "registerRequest" });
        console.log('form data iss ---',formdata);
        const { data } = await axios.post(`${server}/register` , formdata 
        ,{
            headers : {
                'Content-Type' : "multipart/form-data",
            },
            withCredentials : true,
        });

        console.log(' Register  data --',data);
        dispatch({type: 'registerSuccess' , payload : data})
    }catch(error){
        console.log(' Register Error is -',error);
        dispatch({ type:"registerFail" , payload : error.response.data.message });
    }
}



export const logout = () =>  async(dispatch) => {
    try{
        dispatch({ type: 'logoutUserRequest' });
        const { data } = await axios.get(`${server}/logout`,
         {
            withCredentials : false,
         }
        );
        console.log('data get Profile-- ',{data});
        dispatch({ type: 'logoutUserSuccess' , payload : data.message });
    }catch(error){
        dispatch({ type: 'logoutUserFail' , payload : error.response.data.message});
    }
}