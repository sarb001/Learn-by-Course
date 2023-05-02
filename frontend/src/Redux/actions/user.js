
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


export  const getmyprofile = () => async(dispatch) => {
    try{
        dispatch({type:"loadUserRequest"});

        const { data }  = await axios.get(`${server}/getmyprofile` ,
            {
                withCredentials : true,
            });

    console.log('Get Profile Data is --',data);
    dispatch({type : "loadUserSuccess",payload : data.user})
    
}catch(error){
    dispatch({type : "loadUserFail", payload : error.response.data.message })
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