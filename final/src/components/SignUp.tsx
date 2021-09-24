import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import 'whatwg-fetch';
import{
  getFromStorage,
  setInStorage
} from '../utils/storage';
import '../styles/Login.css';
import SignIn from './SignIn';
import Account from './Account'


export default function SignUp(props:any){
  const[signUpError, setSignUpError] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");
  const[justSignedUp, setJustSignedUp] = useState(false);
  
  function onTextboxChangeSignUpUsername(event: any){
    setSignUpUsername(event.target.value);
  }
  function onTextboxChangeSignUpEmail (event: any): void {
    setSignUpEmail(event.target.value);
  }
  function onTextboxChangeSignUpPassword(event: any){
    setSignUpPassword(event.target.value);
  }

      
  function onSignUp(){
        //Post request to backend
        setIsLoading(true);
        fetch('http://localhost:9999/api/account/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              username: signUpUsername,
              email: signUpEmail,
              password: signUpPassword
            }),
        }).then(res=> res.json())
        .then(json => {
          if(json.success){
          setSignUpError(json.message);
          setIsLoading(false);
          setSignUpEmail("");
          setSignUpPassword("");
          setSignUpUsername("");
          setJustSignedUp(true);
            }
            else{
              setSignUpError(json.message);
              setIsLoading(false);
            }
    
        })
      }
      useEffect(() =>{
        const obj = getFromStorage('the_main_app');
        if(obj && obj.token){
          const {token} = obj;
          console.log(`token = ${token}`)
          // verify the token
          fetch('http://localhost:9999/api/account/verify?token=' + token,  {
            method: 'POST',
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }})
          .then(res=> res.json())
          .then(json => {
            if(json.success){
              setToken(token);
              setIsLoading(false);
             
            }else{
             setIsLoading(false);
            }
          })
          
      
        }
        else{
          setIsLoading(false);
        }
      }, [])
        if(justSignedUp){
          return (
            <SignIn justSignedUp={justSignedUp}/>
          );
        }
        if(isLoading){
            return (<div><p>Loading...</p></div>)
          }
        if(!token){
        return(
          <div className="jumbotron vertical-center ">
             {
                (signUpError)?(
                  <p>{signUpError}</p>
                )
                : null
              }
              <div className="container p-6">
                <h3>Sign Up</h3>
                <form className="form mt-2">
                  <div className="form-group col-md-6">
                    <label>Username: </label>
                <input 
                  className="form-control"
                  type="text" 
                  placeholder="username" 
                  value={signUpUsername}
                  onChange={onTextboxChangeSignUpUsername}
                ></input></div><br/>
                <div className="form-group col-md-6">
                    <label>Email: </label>
                  <input 
                    className="form-control"
                    type="email" 
                    placeholder="email" 
                    value={signUpEmail}
                    onChange={onTextboxChangeSignUpEmail}
                  ></input>
                </div><br/>
                <div className="form-group col-md-6">
                  <label>Password: </label>
                  <input 
                    className="form-control"
                    type="password" 
                    placeholder="password" 
                    value={signUpPassword}
                    onChange={onTextboxChangeSignUpPassword}
                  ></input><br/>
                </div>
                <button className= "btn btn-primary" onClick={onSignUp}>Sign Up</button>
                <Link className="text-light m-2 " to="/signin">Sign In</Link>
                <Link className="text-light" to="/">Back to Home</Link>
                </form>
              </div>
              </div>
        )}
        return (
            <SignIn justSignedUp={true}/>
          );
    }

