import { server } from "../store";
import  axios from 'axios';

export const login = (email,password) => async(dispatch) => {
    try{
        dispatch({ type: "loginRequest" });

        const config = {
            headers : {
                'Content-type' : "application/json",
            },  
            withCredentials : true,
        }

        const {data} = await axios.post(`${server}/login` , {email,password} , config )
        // console.log('login data --',data);
        dispatch({type: 'loginSuccess' , payload : data})

    }catch(error){
        // console.log('Login Error is -',error);
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
        
        // console.log(' Load data --',data);
        dispatch({type: 'loadUserSuccess' , payload : data.user })
    }catch(error){
        // console.log(' Load  Error is -',error);
        dispatch({ type:"loadUserFail" , payload : error.response.data.message });
    }
}


export const register = formdata => async dispatch => {
    try{
        dispatch({ type: "registerRequest" });
        // console.log('form data iss ---', formdata);

        const config = { headers : {
                'Content-Type' : "application/json" },
            withCredentials : true,
        }

        const { data } = await axios.post(`${server}/register` , formdata , config);

        // console.log(' Register  data --',data);
        dispatch({type: 'registerSuccess' , payload : data})
    }catch(error){
        // console.log(' Register Error is -',error);
        dispatch({ type:"registerFail" , payload : error.response.data.message });
    }
}


export const logout = () =>  async(dispatch) => {
    try{
        dispatch({ type: 'logoutUserRequest' });
        const { data } = await axios.get(`${server}/logout`,
         {
            withCredentials : true,
         }
        );
        // console.log(' Logout Data -- ',{data});
        dispatch({ type: 'logoutUserSuccess' , payload : data.message });
    }catch(error){
        dispatch({ type: 'logoutUserFail' , payload : error.response.data.message});
    }
}


export const  buySubscription = () =>  async(dispatch) => {
    try{
        // console.log('sub Before Dispatch');
        dispatch({type:"buysubscriptionRequest"})
        
        const config = { headers : {
            'Content-Type' : "application/json" },
        withCredentials : true,
       }
        const {data}  = await axios.get(`${server}/subscribe` , config)

        dispatch({type:"buysubscriptionSuccess" , payload : data.subscriptionId });

    }catch(error){
        dispatch({
            type : "buysubscriptionFail",
            payload : error.response.data.message,
        });        
    }
};

export const cancelsubscription = () => async (dispatch) => {
    try {
        dispatch({ type: 'cancelSubscriptionRequest' });
    
        const { data } = await axios.delete(`${server}/subscribe/cancel`, {
          withCredentials: true,
        });
    
        dispatch({ type: 'cancelSubscriptionSuccess', payload: data.message });
      } catch (error) {
        dispatch({
          type: 'cancelSubscriptionFail',
          payload: error.response.data.message,
        });
      }
}