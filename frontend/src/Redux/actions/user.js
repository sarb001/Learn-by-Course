
import axios from 'axios';
import { server } from '../store';

export  const login = (email,password) => async(dispatch) => {
    try{
        dispatch({type:"loginRequest"});

        const { data }  = await axios.post(`${server}/login` , {
            email,password},{
                headers : {
                    'Content-type' : "application/json",
                },
                withCredentials : true,
            });

    console.log('data is Login  --',data);
    dispatch({type : "loginSuccess",payload : data})
    
}catch(error){
    dispatch({type : "loginFail", payload : error.response.data.message })
    }
}


export  const register = (email,password) => async(dispatch) => {
    try{
        dispatch({type:"loginRequest"});

        const { data }  = await axios.post(`${server}/login` , {
            email,password},{
                headers : {
                    'Content-type' : "application/json",
                },
                withCredentials : true,
            });

    console.log('data is --',data);
    dispatch({type : "loginSuccess",payload : data})
    
}catch(error){
    dispatch({type : "loginFail", payload : error.response.data.message })
    }
}