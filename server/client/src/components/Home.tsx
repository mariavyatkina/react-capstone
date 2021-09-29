import React, {useState, useEffect} from 'react';
import {Image} from 'react-bootstrap';
import "../styles/Home.css"
import{
    getFromStorage,
    setInStorage
  } from '../utils/storage';
import Account from './Account';
import {Link, Redirect} from 'react-router-dom'


export default function Home(props:any) {
  const[token, setToken] = useState("");
  const[isLoading, setIsLoading] = useState(true)

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
          if(isLoading){
            return (<div><p>Loading...</p></div>)
          }
          if(!token){
            console.log("url: "+ process.env.REACT_APP_IMG_URL_1)
              return(
                <>
                
                <div className="container-fluid maindiv text-center">
                <div className="container home-content">
                    <h1 className="display-4">Welcome to Movie App</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi repellat alias distinctio, sed labore fugiat amet iusto suscipit. Numquam eaque doloribus, soluta atque ipsa dicta incidunt eos qui odio quas?</p>
                     <Link className="btn btn-primary m-2 p-3" to="/signin">Sign In</Link>
                     <Link className="btn btn-success m-2 p-3" to="/signup">Sign Up</Link>
                  </div>
                 
              </div>
              </>
              )
          }
          else{
              return(
                <>
                <Redirect to="/account"/>
               <Account/>
              </>
              )
          }

      }


