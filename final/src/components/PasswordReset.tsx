import React, {useEffect, useState} from 'react';
import {Redirect, useLocation} from 'react-router'; 
import '../styles/PasswordReset.css'

export default function PasswordReset() {
    const location: any = useLocation();
    const userId = location.state.userId;
    console.log("location.state = " + userId)
    const[isLoading, setIsLoading] = useState(false);
    const[password, setPassword] = useState("");
    const[newPassword, setNewPassword] = useState("");
    const[resetPasswordError, setResetPasswordError] = useState("");
    const[isReset, setIsReset] = useState(false);
    const[passwordShown, setPasswordShown]= useState(false);

    function onTextboxChangePassword(event: any) {
        setPassword(event.target.value);
    }
    function onTextboxChangeNewPassword(event: any) {
        setNewPassword(event.target.value);
    }
    function toggleShowPassword(e:any){
        e.preventDefault();
        setPasswordShown(!passwordShown);
      }
    function togglePasswordReset(){
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/account/${userId}`, {
            method: 'PUT',
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               },
            body: JSON.stringify({
                password: password,
                new_password: newPassword
            })
        })
        .then(res=> res.json())
        .then(json => {
            if(json.success){
                console.log(json.message);
                alert(json.message);
                setIsLoading(false);
                setIsReset(true);
            }
            else{
                setIsLoading(false);
                console.log(json.message);
            }
        })
        .catch((err:any) => {
            console.log(`Error ${err.message}`);
        })
    }
    if(isLoading){
        return(<div><p>Loading...</p></div>)
    }
    if(isReset){
        return(
        <Redirect to="/account"/>
          );
    }
    return (
        <div className="card password-reset bg-secondary mt-3 mb-3">
            <div className="card-header">
                Password Reset
            </div>
            <div className="card-body">
            {
                (resetPasswordError)
                ?(<h1 className="text-white">{resetPasswordError}</h1>)
                : null
            }
            <form>
            <div className="form-group row">
                    <label  className="col-form-label">Enter Password</label>
                    <div className="col">
                    <input  type={passwordShown ? "text" : "password"} className="form-control" id="inputPassword" placeholder="Password" onChange={onTextboxChangePassword}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label  className="col-form-label">Enter New Password</label>
                    <div className="col">
                    <input  type={passwordShown ? "text" : "password"} className="form-control" id="inputNewPassword" placeholder="New Password" onChange={onTextboxChangeNewPassword}/>
                    </div>
                </div>
                <div className="form-group row">
                    <span
                        className="badge mt-1 show-password-button" 
                        onClick={toggleShowPassword}>
                            {(passwordShown)?
                            ("Hide Password")
                            :("Show Password")
                            }
                    </span>
              </div>
                <div className="form-group row ">
                    <button className= "btn btn-primary mt-3" onClick={togglePasswordReset}>Reset Password</button>
                </div>
                </form>
        </div>
        </div>
    )
}
