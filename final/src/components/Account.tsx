import React, {useState, useEffect} from 'react';
import 'whatwg-fetch';
import{
  getFromStorage,
  setInStorage
} from '../utils/storage';
import {Link, Redirect} from 'react-router-dom'

export default function Account(props:any) {
    const[token, setToken] = useState("");
    const[isLoading, setIsLoading] = useState(true)

    useEffect(() => {
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
      function logout() {
        setIsLoading(true);
        // get the localstorage object
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
          // get token from local storage
          const { token } = obj;
    
          // verify token
          fetch(`http://localhost:9999/api/account/logout?token=${token}`, {
            method: 'POST',
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          })
            .then(res => res.json())
            .then(json => {
              if (json.success) {
                setToken("");
                setIsLoading(false);
              } else {
                // some error
                setIsLoading(false);
              }
            });
        } else {
          // there is no token
          setIsLoading(false);
          setToken("");
        }
    }
        if(!token) {
            return(
                <p>Account not found</p>
            )
        }
        else{
            return(
                <div>
                    This is account
                    <div>
                <button className="btn btn-success m-2">
                <Link className="text-white" to={{pathname: `/account/:email`}}>Account</Link>
              </button>
              <button className="btn btn-danger m-2" onClick={logout}>Logout</button>
              </div>
                </div>
            )
        }
    }
    
