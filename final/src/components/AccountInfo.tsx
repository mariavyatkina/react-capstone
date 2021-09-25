import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import 'whatwg-fetch';
import{
  getFromStorage,
  setInStorage
} from '../utils/storage';
export default function AccountInfo(props: any) {
    return (
        <div className=" card  bg-secondary p-4 mt-2 user-info">
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
                  <button className="col-sm-12 btn btn-success m-2" onClick={props.logout}>Logout</button>
                  <Link className="col-sm-12 btn btn-primary m-2" to={{pathname:"/account/password-reset", state:{userId: props.user.userId}}} >Reset Password</Link>
                  <button className="col-sm-12 btn btn-danger m-2" onClick={props.deleteUser}>Delete Account</button>
                  </div>
               
            </div>
 
            </div>
    )
}
