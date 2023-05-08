import React, { useEffect } from 'react';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Header from './Components/Layout/Header/Header';
import Courses from './Components/Course/Courses';
import CoursePage from './Components/CoursePage/CoursePage';
import Login from './Components/Auth/Login';
import ChangePassword from './Components/Profile/ChangePassword';
import UpdateProfile from './Components/Profile/UpdateProfile';
import Profile from './Components/Profile/Profile';
import Contact from './Components/Contact/Contact';
import Request from './Components/Request/Request';
import About from './Components/About/About';
import Register from './Components/Auth/Register';
import ForgetPassword from './Components/Auth/ForgetPassword';
import ResetPassword from './Components/Auth/ResetPassword';
import Subscribe from './Components/Payments/Subscribe';
import NotFound from './Components/Layout/Not-Found/NotFound';
import PaymentSuccess from './Components/Payments/PaymentSuccess';
import PaymentFail from './Components/Payments/PaymentFail';
import Dashboard from './Components/Admin/Dashboard/Dashboard';
import CreateCourse from './Components/Admin/CreateCourses/CreateCourse';
import AdminCourse from './Components/Admin/AdminCourses/AdminCourse';
import Users from './Components/Admin/Users/Users';
import Footer from './Components/Layout/Footer/Footer';

import { useDispatch, useSelector } from 'react-redux';
import toast,{ Toaster } from 'react-hot-toast';

import { ProtectedRoute } from 'protected-route-react';
import { loaduser } from './Redux/actions/user';


function App() {

  const { isAuthenticated ,user, message,error}  = useSelector(state => state.user)
  const dispatch = useDispatch();

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch({ type:"clearError" });
    }
    if(message){
      toast.success(message);
      dispatch({ type:"clearMessage" });
    }
  },[dispatch,error,message]);

  useEffect(() => {
    dispatch(loaduser());
  },[dispatch])


  return (
    <div className = "App">
       <Router>
          <Header user = {user}  isAuthenticated = {isAuthenticated} />
                <Routes>
                    <Route  exact path = "/"       element = {<Home />}>  </Route>

                    <Route  path = "/courses"     element = {<Courses />}>  </Route>
                    <Route  path = "/course/:id"  element = {<CoursePage />}>  </Route>

              {/* If user is not verified or logged in show Logged In Page */}

                    <Route  path = "/login"  element = {
                      <ProtectedRoute isAuthenticated = {!isAuthenticated} redirect = "/profile">
                        <Login  /> 
                      </ProtectedRoute>
                    }>  </Route>
                    <Route exact path = "/changepassword"  element = {<ChangePassword /> }>  </Route>
                    <Route exact path = "/updateprofile"  element = {<UpdateProfile /> }>  </Route>
                    {/* Only able to access Profile if user is authenticated */}
                    <Route exact path = "/profile"  element = {
                         <ProtectedRoute isAuthenticated = {isAuthenticated} >  
                          <Profile />  
                        </ProtectedRoute>
                    }>  </Route>
                  
                    <Route exact path = "/contact"  element = {<Contact /> }>  </Route>
                    <Route exact path = "/request"  element = {<Request /> }>  </Route>
                    <Route exact path = "/about"   element = {<About /> }>     </Route>
                    <Route  path = "/register"     element = {
                       <ProtectedRoute isAuthenticated = {!isAuthenticated} redirect = "/profile" >
                           <Register />
                       </ProtectedRoute> 
                     }>  
                     </Route>


                    <Route exact path = "/forgetpassword"  element = {<ForgetPassword  /> }>  </Route>
                    <Route exact path = "/resetpassword/:token"  element = {<ResetPassword /> }>  </Route>

                    <Route exact path = "/subscribe"  element = {<Subscribe /> }>  </Route>
                    <Route exact path = "*"  element = {<NotFound /> }>  </Route>
                    <Route exact path = "/paymentsuccess"  element = {<PaymentSuccess /> }>  </Route>
                    <Route exact path = "/paymentfail"  element = {<PaymentFail /> }>  </Route>
                    
                    
                    <Route exact path = "/admin/dashboard"  element = {<Dashboard /> }>  </Route>
                  
                    <Route exact path = "/admin/createcourse"  element = {<CreateCourse /> }>  </Route>
                    
                    <Route exact path = "/admin/courses"  element = {<AdminCourse /> }>  </Route>
                    
                    <Route exact path = "/admin/users"  element = {<Users /> }>  </Route> 

                </Routes>
              <Footer />
              <Toaster />
       </Router>

    </div>
  );
}

export default App;
