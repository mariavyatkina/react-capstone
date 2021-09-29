import React, {useState, useEffect} from 'react';
import 'whatwg-fetch';
import Home from './Home';
//import {FillStarFill, HeartFill, SkipForwardFill } from 'react-bootstrap-icons';
import{
  getFromStorage,
  setInStorage
} from '../utils/storage';
import {Link, Redirect} from 'react-router-dom'
import AccountInfo from './AccountInfo';
import '../styles/Account.css';
import Axios from 'axios';
import dotenv from 'dotenv';
import SelectedMovieList from './SelectedMovieList';

dotenv.config();

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
        fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/account/verify?token=` + token,  {
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
      fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/account/user/${token}`, {
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
      fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/account/${userId}`, {
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
      },[userId, token])
    function logout() {
        setIsLoading(true);
        // get the localstorage object
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
          // get token from local storage
          const { token } = obj;
    
          // verify token
          fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/account/logout?token=${token}`, {
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
    function deleteUser(){
      setIsLoading(true);

      fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/account/${userId}`, {
        method: 'DELETE',
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
      .then(res=> res.json())
      .then(json => {
        if(json.success){
          setIsLoading(false);
          alert(json.message);
          logout();
        }
        else{
          setIsLoading(false);
          console.log(json.message)
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log(`Error : ${err.message}`)
      })

    }
    const user = {
      email: email,
      username: username,
      isDeleted: isDeleted,
      userId: userId
    }
        if(!token || !userId) {
            return(
              <>
              <Redirect to="/"/>
              <Home/>
                </>
            )
        }
        else{
            return(
              
              <div className="container-fluid account mt-5 ml-5">
              <h4 className="greeting"><strong> Hi, <strong className="text-danger">{user.username}</strong></strong></h4>
              <div className="row account-content text-center ">
              <div className="col-md-3">
                  <AccountInfo user={user} logout={logout} deleteUser={deleteUser}/>
                </div>
                <div className="col-md-6 account-browse">
                  <Link to="account/browse-movies"><div className="container-fluid text-center browse-movies-banner"><h1 className="display-3 ">Browse Movies  </h1></div></Link>
                  <div className="buttons-account mt-5">
                    <Link className="btn btn-danger button-account" to={{pathname:"/account/favorites", state:{userId: userId, category: "Favorites"}}} style={{fontSize:"25px", margin: "20px",padding: "15px 50px"}}>Favorites</Link>
                    <Link className="btn btn-warning button-account" to={{pathname:"/account/watchlist", state:{userId: userId, category: "Watchlist"}}} style={{fontSize:"25px", margin: "20px",padding: "15px 50px"}}>Watchlist</Link>
                  </div>
                </div>
                
              </div>
            
             
             
           </div>
            )
        }
    }
    
