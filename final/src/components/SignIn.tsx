import React, {useEffect, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import 'whatwg-fetch';
import{
  getFromStorage,
  setInStorage
} from '../utils/storage';
import '../styles/Login.css';
import Account from './Account';


export default function SignIn(props: any) {

    const[signInError, setSignInError] = useState("");
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState("");
    const[passwordShown, setPasswordShown]= useState(false);

      
      useEffect(() =>{
        if(props.justSignedUp){
          alert("You have successfully signed up!")
        }
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
    
      

      function onTextboxChangeSignInEmail (event: any): void {
        setSignInEmail(event.target.value);
      }
      function onTextboxChangeSignPassword(event: any){
        setSignInPassword(event.target.value);
      }
      function toggleShowPassword(e:any){
        e.preventDefault();
        setPasswordShown(!passwordShown);
      }
       function onSignIn(){
        //Post request to backend

        setIsLoading(true);
    
        fetch('http://localhost:9999/api/account/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email: signInEmail,
              password: signInPassword
            }),
        }).then(res=> res.json())
        .then(json => {
            if(json.success){
              setInStorage('the_main_app', {token: json.token})
              setSignInError(json.message);
              setIsLoading(false);
              setSignInEmail("");
              setSignInPassword("");
              setToken(json.token);
            }
            else{
              setSignInError(json.message);
              setIsLoading(false);
            }
    
        })
    
      }
        if(isLoading){
          return (<div><p>Loading...</p></div>)
        }
        if(!token){
        return(
          <div className="jumbotron login vertical-center horizontal-center col-5">
            {
            (signInError)?(
              <p>{signInError}</p>
            )
            : null
          }
          <div className="container p-6">
            <h3>Sign In</h3>
            <form className="form mt-2">
              <div className="form-group">
                <label>Email:</label>
            <input
             className="form-control" 
              type="email"
              placeholder="email" 
              value={signInEmail}
              onChange={onTextboxChangeSignInEmail}
            ></input><br/>
            </div>
            <div className="form-group">
            <label>Password:</label>
            <input 
              className="form-control"
              type={passwordShown ? "text" : "password"}
              placeholder="password" 
              value={signInPassword}
              onChange={onTextboxChangeSignPassword}
            ></input>
             <span
              className="badge mt-1 show-password-button" 
              onClick={toggleShowPassword}>
                {(passwordShown)?
                ("Hide Password")
                :("Show Password")
                }
              </span>
            </div><br/>
            <button className="btn btn-primary" onClick={onSignIn}>Sign In</button>
           <Link className="text-light m-2 " to="/signup">Sign Up</Link>
           <Link className="text-light" to="/">Back to Home</Link>
            </form>
          </div>
            </div>
         )
        }
        return (
          <Redirect to="/account"/>
        );
      }


