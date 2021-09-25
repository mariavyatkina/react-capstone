import React, {useState, useEffect} from 'react';
import 'whatwg-fetch';
import Home from './Home';
import {BsFillStarFill, BsHeartFill, BsSkipForwardFill } from 'react-icons/bs';
import{
  getFromStorage,
  setInStorage
} from '../utils/storage';
import {Link, Redirect} from 'react-router-dom'
import AccountInfo from './AccountInfo';
import '../styles/Account.css';

export default function Account(props:any) {
    const[email, setEmail] = useState("");
    const[username, setUsername] = useState("");
    const[isDeleted, setIsDeleted] = useState(false);
    const [userId, setUserId] = useState("");
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);

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
          }
      })
      fetch(`http://localhost:9999/api/account/user/${token}`, {
          method: 'GET',
          headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
      })
      .then(res=> res.json())
      .then(json => {
          if(json.success){
              setUserId(json.userId);

          }
      })
      .catch(err => {
          console.log("error: " + err)
      })
      fetch(`http://localhost:9999/api/account/${userId}`, {
          method: 'GET',
          headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
      })
      .then(res=> res.json())
      .then(json => {
          if(json.success){
              setEmail(json.email);
              setUsername(json.username);
              setIsDeleted(json.isDeleted);
              setIsLoading(false);
          }
          else{
              setIsLoading(false);
          }
      })
      .catch(err => {
          console.log(`Error: ${err.message}`);
      })
      }
      else{
        setIsLoading(false);
      }
      
      })
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
              console.log("Within logout function")
              if (json.success) {
                setToken("");
                setIsLoading(false);
              } else {
                // some error
                setIsLoading(false);
              }
            })
            .catch(err => {
              console.log(`Error: ${err.message}`)
            })
        } else {
          // there is no token
          setIsLoading(false);
          setToken("");
        }
        console.log("Token: " + token)
        window.location.reload();
        
    }
    
    const user = {
      email: email,
      username: username,
      isDeleted: isDeleted,
      userId: userId
    }
        if(!token) {
            return(
              <>
              <Redirect to="/"/>
              <Home/>
                </>
            )
        }
        else{
            return(
              <div className="container-fluid account">
              <h4><strong> Hi, <strong className="text-danger">{user.username}</strong></strong></h4>
              <div className="account-content text-center">
              <div className="jumbotron text-center browse-movies"><h1 className="display-5"> Browse Movies  <BsSkipForwardFill/></h1></div>
              <div>
                <button className="btn btn-warning m-3">  Watchlist    <BsFillStarFill /></button>
                <button className="btn btn-danger m-3 ">Favorites <BsHeartFill/> </button>
              </div>
              </div>
             <AccountInfo user={user} logout={logout}/>
             
             
           </div>
            )
        }
    }
    
