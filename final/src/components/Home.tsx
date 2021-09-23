import React from 'react';
import "../styles/Home.css"
import{
    getFromStorage,
    setInStorage
  } from '../utils/storage';
class Home extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state={
            isLoadin: true,
            token: ''
        }
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
      render(){
          const{isLoading, token} = this.state;

          if(isLoading){
            return (<div><p>Loading...</p></div>)
          }
          if(!token){
              return(
                <div>
                   This is unlogged in home page 
              </div>
               
              )
          }
          else{
              return(
                  <div>This is page of a logged in user</div>
              )
          }

      }
}

export default Home;