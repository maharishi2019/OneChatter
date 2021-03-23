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
  const [anonymous, setAnonymous] = useState(localStorage.getItem("anonymous") === "true" ? true : false); 

  function handleAuthentication(user, anonymous){
    if(anonymous === true){
      setAnonymous(true); 
      localStorage.setItem("anonymous", true); 
    }

    setAuthenticated(true); 
    setUser(user); 
    localStorage.setItem("authenticated", true); 
    localStorage.setItem("user", JSON.stringify(user)); 
  }

  function handleAnonymous(){
    if (anonymous=== true) {
      setAnonymous(false);
      localStorage.setItem("anonymous", false);
    }
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
            anonymous={anonymous}
            logOut={logOut}
            currentUser={user}
          />
          <Route exact path="/login" render={(props) => <Login {...props} handleAuthentication={handleAuthentication} handleAnonymous={handleAnonymous} anonymous={anonymous}/>} />
        </Switch>
      </Router>
    </div>
  ); 
}