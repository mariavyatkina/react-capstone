import React from 'react';
import './styles/App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {Link, BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './components/Header'
import Account from './components/Account'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import Footer from './components/Footer';
import PasswordReset from './components/PasswordReset';
import BrowseMovies from './components/BrowseMovies';
function App() {
  return (
    <BrowserRouter>
    <div className="App container-fluid bg-dark">
    <Header/>
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
          <Route path="/account/browse-movies/movie-details">
            <MovieDetails/>
          </Route>
          <Route path="/account/browse-movies">
            <BrowseMovies/>
          </Route>
          <Route path="/account">
            <Account/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
    <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
