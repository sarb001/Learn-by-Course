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

export const logout = () =>  async(dispatch) => {
    try{
        dispatch({ type: 'logoutUserRequest' });
        const { data } = await axios.get(`${server}/logout`,
         {
            withCredentials : false,
         }
        );
        console.log('data get Profile-- ',{data});
        dispatch({ type: 'logoutUserSuccess'  , payload : data.message });
    }catch(error){
        dispatch({ type: 'logoutUserFail' , payload :error.response.data.message});
    }
}