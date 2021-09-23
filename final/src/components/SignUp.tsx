import React, { Component } from 'react';
import 'whatwg-fetch';
import{
  getFromStorage,
  setInStorage
} from '../utils/storage';
import '../styles/Login.css';
import { Link } from 'react-router-dom';

class SignUp extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            signUpError:'',
            signUpUsername: '',
            signUpEmail: '',
            signUpPassword:'',
            isLoading: true,
            token: ''
        }

        this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
        this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
        this.onTextboxChangeSignUpUsername = this.onTextboxChangeSignUpUsername.bind(this);
        this.logout = this.logout.bind(this);
        
        this.onSignUp = this.onSignUp.bind(this);
    }

    componentDidMount() {
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
            this.setState({
              token,
              isLoading: false
            })
          }else{
            this.setState({
              isLoading:false
            })
          }
        })
        
    
      }
      else{
        this.setState({
          isLoading: false
        })
      }
    }
  
    
    onTextboxChangeSignUpEmail(event: any){
        this.setState({
          signUpEmail: event.target.value
        })
      }
      onTextboxChangeSignUpPassword(event: any){ 
        this.setState({
          signUpPassword: event.target.value
        })
      }
      onTextboxChangeSignUpUsername(event: any){
        this.setState({
          signUpUsername: event.target.value
        })
      }
      
      onSignUp(){
        //Grab State
        const {
          signUpUsername,
          signUpEmail,
          signUpPassword
        } = this.state;
        //Post request to backend
        this.setState({
          isLoading: true
        })
    
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
              this.setState({
                signUpError: json.message,
                isLoading:false,
                signUpEmail: '',
                signUpPassword:'',
                signUpUsername: ''
    
              })
            }
            else{
              this.setState({
                signUpError: json.message,
                isLoading:false
              })
            }
    
        })
      }
      logout() {
        this.setState({
          isLoading: true,

        });
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
                this.setState({
                  token: "",
                  isLoading: false
                });
              } else {
                // some error
                this.setState({
                  isLoading: false
                });
              }
            });
        } else {
          // there is no token
          this.setState({
            isLoading: false,
            token: ""
          });
        }
      }
    render(){
        const{signUpError,  signUpEmail, signUpPassword, signUpUsername, isLoading, token} = this.state;

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
                  onChange={this.onTextboxChangeSignUpUsername}
                ></input></div><br/>
                <div className="form-group col-md-6">
                    <label>Email: </label>
                  <input 
                    className="form-control"
                    type="email" 
                    placeholder="email" 
                    value={signUpEmail}
                    onChange={this.onTextboxChangeSignUpEmail}
                  ></input>
                </div><br/>
                <div className="form-group col-md-6">
                  <label>Password: </label>
                  <input 
                    className="form-control"
                    type="password" 
                    placeholder="password" 
                    value={signUpPassword}
                    onChange={this.onTextboxChangeSignUpPassword}
                  ></input><br/>
                </div>
                <button className= "btn btn-primary" onClick={this.onSignUp}>Sign Up</button>
                </form>
              </div>
              </div>
        )}
        return (
            <div>
             
             <p>Account</p>
             <button onClick={this.logout}>Logout</button>
            </div>
          );
    }
} 

export default SignUp;