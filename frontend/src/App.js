import React from 'react';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import Home from './Components/Home/Home';

function App() {
  return (
    <div className = "App">
       <Router>
          <Routes>
              <Route exact path = "/"       element = {<Home />}>  </Route>
              <Route  path = "/courses"     element = {<Home />}>  </Route>
              <Route  path = "/course/:id"  element = {<Home />}>  </Route>

              <Route exact path = "/login"  element = {</> }>  </Route>
              <Route exact path = "/login"  element = {</> }>  </Route>
              <Route exact path = "/login"  element = {</> }>  </Route>
              <Route exact path = "/profile"  element = {</> }>  </Route>
             
             
              <Route exact path = "/profile"  element = {</> }>  </Route>
              <Route exact path = "/profile"  element = {</> }>  </Route>
              <Route exact path = "/profile"  element = {</> }>  </Route>
              <Route exact path = "/register"  element = {</> }>  </Route>


              <Route exact path = "/forgetpassword"  element = {</> }>  </Route>
              <Route exact path = "/resetpassword/:token"  element = {</> }>  </Route>


              <Route exact path = "/subscribe"  element = {</> }>  </Route>
              <Route exact path = "/resetpassword/:token"  element = {</> }>  </Route>
              <Route exact path = "/resetpassword/:token"  element = {</> }>  </Route>
              <Route exact path = "/paymentfail"  element = {</> }>  </Route>
              
              
              <Route exact path = "/admin/dashboard"  element = {</> }>  </Route>
             
              <Route exact path = "/admin/createcourse"  element = {</> }>  </Route>
              
              <Route exact path = "/admin/courses"  element = {</> }>  </Route>
              
              <Route exact path = "/admin/users"  element = {</> }>  </Route>


          </Routes>
       </Router>
    </div>
  );
}

export default App;
