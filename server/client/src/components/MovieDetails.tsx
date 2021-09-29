import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import BackToAccount from './BackToAccount';
import 'whatwg-fetch';
import{
  getFromStorage,
} from '../utils/storage';
import Axios from 'axios';
import "../styles/MovieDetails.css"
export default function MovieDetails() {
    const location: any = useLocation();
    const[isLoading, setIsLoading] = useState(true);
    const[isFavorited, setIsFavorited] = useState(false);
    const[isOnWatchlist, setIsOnWatchlist] = useState(false)
    const movieDetails = location.state.movieDetails;

    useEffect(() =>{
      const obj = getFromStorage('the_main_app');
      if(obj && obj.token){
        const {token} = obj;
      
      fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/movies/${location.state.userId}/${location.state.imdbID}`,
      {method: 'GET',
      headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
      .then(res=>res.json())
      .then(json => {
        console.log(json.message)
        if(json.success){
          setIsLoading(false);
          setIsFavorited(json.isFavorited);
          setIsOnWatchlist(json.isOnWatchlist);
        }
        else{
          setIsLoading(false);
        }
      })
      .catch((err:any) => {
        console.log(`Error: ${err.message}`)
      })
    }
    }, [ isOnWatchlist, isFavorited])
    function toggleAddToFavorites(e:any){
      e.preventDefault();
      setIsLoading(true);
      fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/movies/${location.state.userId}/add-movie/${location.state.imdbID}`,
      {method: 'POST',
      headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
      .then(res=>res.json())
      .then(json => {
        console.log(json.message)
        if(json.success){
          // TODO: write fetch api request

          fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/movies/${location.state.userId}/set-favorites/${location.state.imdbID}`,
          {method: 'PUT',
          headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          })
          .then(res=> res.json())
          .then(json=> {
            if(json.success){
              setIsFavorited(!isFavorited);
            }
            setIsLoading(false)
            
          })
          .catch(err => {
            console.log(`Error: ${err.message}`)
          })
        }
        else{
          console.log(json.message)
        }
      })
      .catch((err:any) => {
        console.log(`Error: ${err.message}`)
      })
    }
    function toggleAddToWatchlist(e:any){
      e.preventDefault();
      fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/movies/${location.state.userId}/add-movie/${location.state.imdbID}`,
      {method: 'POST',
      headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
      .then(res=>res.json())
      .then(json => {
        console.log(json.message)
        if(json.success){
          // TODO: write fetch api request

          fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/movies/${location.state.userId}/set-watchlist/${location.state.imdbID}`,
          {method: 'PUT',
          headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          })
          .then(res=> res.json())
          .then(json=> {
            setIsOnWatchlist(!isOnWatchlist);
          })
          .catch(err => {
            console.log(`Error: ${err.message}`)
          })
        }
        else{
          console.log(json.message)
        }
      })
      .catch((err:any) => {
        console.log(`Error: ${err.message}`)
      })
    }
    if(isLoading){
      return(<div><p>Loading...</p></div>)
    }
    return (
      <>
      <BackToAccount/>
        <div className="card movie-details movie-card">
          <img className="card-img-top" src={movieDetails.Poster} alt="Card image cap"/>
          <div className="card-body details bg-dark">
            <h5 className="card-title text-warning">{movieDetails.Title} - {movieDetails.Year} <span className="badge bg-danger m-2 float-right">{movieDetails.Rated}</span></h5>
            <p className="card-text">
              Plot :  {movieDetails.Plot}<br/><br/>
              Released :  {movieDetails.Released}<br/>
              Runtime :  {movieDetails.Runtime}<br/>
              Genre :  {movieDetails.Genre}<br/>
              Director :  {movieDetails.Director}<br/>
              Writer :  {movieDetails.Writer}<br/>
              Actors :  {movieDetails.Actors}<br/>
              Language :  {movieDetails.Language}<br/>
              Country :  {movieDetails.Country}<br/>
              Awards :  {movieDetails.Awards}<br/>
            </p>
            <div className="form-group row m-2">
            {
                      (isOnWatchlist)?
                      (<button className="btn btn-secondary m-2" onClick={toggleAddToWatchlist} > Watchlisted</button>):
                      (<button className="btn btn-warning m-2" onClick={toggleAddToWatchlist}> Add to Watchlist</button>)

            }
                    {
                      (isFavorited)?
                      (<button className="btn btn-success m-2" onClick = {toggleAddToFavorites}> Favorited</button>):
                      (<button className="btn btn-danger m-2" onClick = {toggleAddToFavorites}> Add to Favorites</button>)

                    }
            </div>
        </div>
      </div>
      </>
    )
}
