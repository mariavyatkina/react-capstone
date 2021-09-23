import React, { Component } from 'react';
import 'whatwg-fetch';
import{
  getFromStorage,
  setInStorage
} from '../utils/storage';
import '../styles/Login.css';



class SignIn extends React.Component<any, any> {
    constructor(props:any) {
        super(props);

      this.state= {
        signInError: '',
        signInEmail: '',
        signInPassword:'',
        isLoading: true,
        token: ''
      }

      this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
      this.onTextboxChangeSignPassword = this.onTextboxChangeSignPassword.bind(this);
      this.onSignIn = this.onSignIn.bind(this);

      this.logout = this.logout.bind(this);
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
    
      

      onTextboxChangeSignInEmail(event: any){
        this.setState({
          signInEmail: event.target.value
        })
      }
      onTextboxChangeSignPassword(event: any){
        this.setState({
          signInPassword: event.target.value
        })
      }
      onSignIn(){
        //Grab State
        const {
          signInEmail,
          signInPassword
        } = this.state;
        //Post request to backend
        this.setState({
          isLoading: true
        })
    
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
              this.setState({
                signInError: json.message,
                isLoading:false,
                signInEmail: '',
                signInPassword:'',
                token: json.token,
    
              })
            }
            else{
              this.setState({
                signInError: json.message,
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
      render() {
        const{isLoading, token, signInError, signInEmail, signInPassword} = this.state;
        if(isLoading){
          return (<div><p>Loading...</p></div>)
        }
        if(!token){
        return(
          <div className="jumbotron vertical-center">
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
              onChange={this.onTextboxChangeSignInEmail}
            ></input><br/>
            </div>
            <div className="form-group">
            <label>Password:</label>
            <input 
              className="form-control"
              type="password" 
              placeholder="password" 
              value={signInPassword}
              onChange={this.onTextboxChangeSignPassword}
            ></input></div><br/>
            <button className="btn btn-primary" onClick={this.onSignIn}>Sign In</button>
            
            </form>
          </div>
            </div>
         )
        }
        return (
          <div>
           
           <p>Account</p>
           <button onClick={this.logout}>Logout</button>
          </div>
        );
      }

}
export default SignIn;