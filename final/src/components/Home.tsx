import React, {useState, useEffect} from 'react';
import "../styles/Home.css"
import{
    getFromStorage,
    setInStorage
  } from '../utils/storage';
import Account from './Account';
import {Link} from 'react-router-dom'


export default function Home(props:any) {
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
          if(isLoading){
            return (<div><p>Loading...</p></div>)
          }
          if(!token){
              return(
                <>
                
                <div>
                   <button className="btn btn-primary">
                     <Link className="text-white" to="/signin">Sign In</Link>
                   </button>
                   <button className="btn btn-success m-2">
                     <Link className="text-white" to="/signup">Sign Up</Link>
                   </button>
              </div>
              </>
              )
          }
          else{
              return(
                <>
               <Account/>
              </>
              )
          }

      }


