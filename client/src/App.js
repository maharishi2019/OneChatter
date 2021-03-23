import React, {useState} from "react"

import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect
} from "react-router-dom";

import Home from "./Home"
import Login from "./Login"
import PrivateRoute from "./Routes/PrivateRoute"

export default function App(){
  const localUser = localStorage.getItem("user"); 
  const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") === "true" ? true : false); 
  const [user, setUser] = useState(localUser ? JSON.parse(localUser) : null); 

  function handleAuthentication(user){
    setAuthenticated(true); 
    setUser(user); 
    localStorage.setItem("authenticated", true); 
    localStorage.setItem("user", JSON.stringify(user)); 
  }

  function logOut(){
    setAuthenticated(false); 
    localStorage.setItem("authenticated", false); 
    window.location.reload(); 
  }

  return(
    <div>
      <Router>
        <Switch>
          <PrivateRoute 
            exact
            path={'/'}
            component={Home}
            authenticated={authenticated}
            logOut={logOut}
            currentUser={user}
          />
          <Route exact path="/login" render={(props) => <Login {...props} handleAuthentication={handleAuthentication} />} />
        </Switch>
      </Router>
    </div>
  ); 
}