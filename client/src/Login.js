import React, {useState} from "react" 

import firebase from "./Firebase" 
import "firebase/auth"

import RandomUsername from "./Tools/RandomUsername" 

export default function Login(props){
    function handleSubmit(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then(async (result) => {
                var credential = result.credential;
                var token = credential.accessToken;

                var user = result.user;

                //checking if user is anonymous and setting to false
                props.handleAnonymous();
                //authenticating the user
                props.handleAuthentication(user);
                //pushing to home
                props.history.push("/");
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                var email = error.email;

                var credential = error.credential;
                alert(errorMessage);
            });
    }

    //handling the authentication anonymously
    function handleAnonymously(){
        var user = {
            displayName: RandomUsername(), 
        }

        props.handleAuthentication(user, true); 
        props.history.push("/"); 
    }
    
    //rendering login based on if the user is anonymous or not
    function renderLogin(){
        if(props.anonymous){
            return(
                <div className="login-div">
                    <button className="btn btn-dark" onClick={handleSubmit}>Google Login</button>
                </div>
            ); 
        }else{
            return(
                <div className="login-div">
                    <button className="btn btn-dark" onClick={handleSubmit}>Google Login</button>
                    <button className="btn btn-dark" onClick={handleAnonymously}>Continue Anonymously</button>
                </div>
            ); 
        }
    }
    return(
        <div>
            {renderLogin()}
        </div>
    ); 
}