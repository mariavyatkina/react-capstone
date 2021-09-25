import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import 'whatwg-fetch';
import{
  getFromStorage,
  setInStorage
} from '../utils/storage';
export default function AccountInfo(props: any) {
  function redirectToPasswordReset(){
    
  }
    return (
        <div className="card  bg-secondary mt-3 mb-3">
            <div className="card-header">
                <h5 >Account Info</h5>
    
            </div>
            <div className="card-body ">
            
                    <label  className="col col-form-label m-2">Username:</label>
                    <label  className="col col-form-label m-2">{props.user.username}</label> <br/>
                    <label  className="col col-form-label m-2">Email:</label>
                    <label  className="col col-form-label m-2">{props.user.email}</label><br/>
                    <label  className="col col-form-label m-2">Deleted: </label>
                    <label  className="col col-form-label m-2">{(props.user.isDeleted)?(<>Yes</>): (<>No</>)}</label>
        
                <div className="row">
                  <button className="col-md-3 col-sm-12 btn btn-success m-1" onClick={props.logout}>Logout</button>
                  <Link className="col-md-4 col-sm-12 btn btn-primary m-1" to={{pathname:"/account/password-reset", state:{userId: props.user.userId}}} >Reset Password</Link>
                  <button className="col-md-4 col-sm-12 btn btn-danger m-1">Delete Account</button>
                  </div>
               
            </div>
 
            </div>
    )
}
