import React from 'react';
import './styles/App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {Link, BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './components/Header'
import Account from './components/Account'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import PasswordReset from './components/PasswordReset';
import AccountInfo from './components/AccountInfo';
function App() {
  return (
    <BrowserRouter>
    <div className="App container-fluid bg-dark">
    <Header/>
        <div className="container col-6 maindiv pb-6 m-6">
        <Switch>
          <Route path="/signin">
            <SignIn/>
          </Route>
          <Route path="/signup">
            <SignUp/>
          </Route>
          <Route path="/account/password-reset">
            <PasswordReset/>
          </Route>
          <Route path="/account">
            <Account/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
