import { server } from "../store";
import  axios from 'axios';


// Only Available for Admin Access 

export const createcourse = (formdata) => async(dispatch) => {
    try{
         const config = {
            headers : {
                'Content-Type' : "application/json"
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

export const deletecourse = (id) => async(dispatch) => {
    try{
         const config = {
            withCredentials : true,
         }

         dispatch({type:"deleteCourseRequest"});
         const { data } =  await axios.delete(`${server}/course/${id}` ,
          config );

         dispatch({type:"deleteCourseSuccess",payload : data.message })

    }catch(error){
        dispatch({ 
            type: "deleteCourseFail" ,payload : error.response.data.message });
    }

}

    // 

export const  addLecture   = (id,formdata) => async(dispatch) => {
    try{
        
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
            withCredentials: true,
        };

        dispatch({type:"addLectureRequest"});
        const { data } =  await axios.post(`${server}/course/${id}` ,
         formdata,
         config );

        dispatch({type:"addLectureSuccess",payload : data.message })

    }catch(error){
        dispatch({ 
            type: "addLectureFail" ,payload : error.response.data.message });
    }
}


export const  deleteLecture = (courseId,lectureId) => async(dispatch) => {
    try{
         const config = {
            withCredentials : true,
         }

        dispatch({ type:"deleteLectureRequest" });

          const { data } =  await axios.delete(
            `${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`,
            config );

        dispatch({type:"deleteLectureSuccess",payload : data.message })

    }catch(error){
        dispatch({ 
            type: "deleteLectureFail" ,
            payload : error.response.data.message });
    }
}

// get all users

export const  getallUsers   = () => async(dispatch) => {
    try{
        const config = {
            withCredentials: true,
        };

        dispatch({type:"getAllUsersRequest"});
        const { data } =  await axios.get(`${server}/admin/users` ,
         config );

        dispatch({type:"getAllUsersSuccess",payload : data.users })

    }catch(error){
        dispatch({ 
            type: "getAllUsersFail" ,
            payload : error.response.data.message });
    }
}


export const  updateuser   = (id) => async(dispatch) => {
    try{
        const config = {
            withCredentials: true,
        };

        dispatch({type:"updateUserRoleRequest"});
        const { data } =  await axios.put(`${server}/admin/user/${id}` , {},
         config );

        dispatch({type:"updateUserRoleSuccess", payload : data.message })

    }catch(error){
        dispatch({ 
            type: "updateUserRoleFail" ,
            payload : error.response.data.message });
    }
}


export const  deleteUser   = (id) => async(dispatch) => {
    try{
        
        const config = {
            withCredentials: true,
        };

        dispatch({type:"deleteUserRequest"});
        const { data } =  await axios.delete(`${server}/admin/user/${id}` ,
         config );

        dispatch({type:"deleteUserSuccess",payload : data.message })

    }catch(error){
        dispatch({ 
            type: "deleteUserFail" ,
            payload : error.response.data.message });
    }
}




