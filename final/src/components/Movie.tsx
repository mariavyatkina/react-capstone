import React, {useEffect, useState} from 'react'
import "../styles/Movie.css"
import Axios from 'axios';
import 'whatwg-fetch';
import{
  getFromStorage,
} from '../utils/storage';
import {Link} from 'react-router-dom'

export default function Movie(props: any) {
    
    const[movieDetails, setMovieDetails] = useState({});
    const[isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState("");
    const[isFavorited, setIsFavorited] = useState(false);
    const[isOnWatchlist, setIsOnWatchlist] = useState(false)
    useEffect(() =>{
      const obj = getFromStorage('the_main_app');
      if(obj && obj.token){
        const {token} = obj;
        Axios.get(`${process.env.REACT_APP_OMDB_URL}/?i=${props.movie.imdbID}&apikey=${process.env.REACT_APP_API_KEY}`)
        .then((response) =>{
        if(response.data.Response === "True"){ 
            setIsLoading(false);
            setMovieDetails(response.data)
        } 
        else{
            setIsLoading(false);
        }
      }
      )
      .catch((error) =>{
          setIsLoading(false);
        console.log(`Error: ${error.message}`);
      })
      fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/account/user/${token}`, {
          method: 'GET',
          headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          })
          .then(res=> res.json())
          .then(json => {
              if(json.success){
                  setUserId(json.userId);
              }
          })
          .catch(err => {
              console.log("error: " + err)
          })
      console.log("fetched userId: " + userId);
      fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/movies/${userId}/${props.movie.imdbID}`,
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
          console.log("SUCCESS")
          setIsFavorited(json.isFavorited);
          setIsOnWatchlist(json.isOnWatchlist);
        }
      })
      .catch((err:any) => {
        console.log(`Error: ${err.message}`)
      })
    }
    }, [userId, isOnWatchlist, isFavorited])
    function toggleAddToFavorites(e:any){
      e.preventDefault();
      fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/movies/${userId}/add-movie/${props.movie.imdbID}`,
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

          fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/movies/${userId}/set-favorites/${props.movie.imdbID}`,
          {method: 'PUT',
          headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          })
          .then(res=> res.json())
          .then(json=> {
            setIsFavorited(!isFavorited);
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
      fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/movies/${userId}/add-movie/${props.movie.imdbID}`,
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

          fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/movies/${userId}/set-watchlist/${props.movie.imdbID}`,
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
        return(<div><p>Loading...</p></div>);
    }
    return (
        <div className=" col-5 card movie-card">
        <img className="card-img-top" src={props.movie.Poster} alt="Card image cap"/>
        <div className="card-body bg-dark">
          <h5 className="card-title">{props.movie.Title}</h5>
          <p className="card-text">
              Release Year: {props.movie.Year}<br/>
                Type: {props.movie.Type}
          </p>
          <div className="row m-1 mb-2 pt-2 pb-2">
          <Link  className="btn btn-primary" to={{pathname:"/account/browse-movies/movie-details", state:{movieDetails: movieDetails, imdbID: props.movie.imdbID, userId: userId }}}>Details</Link>
          </div>
              <div className="row m-1">
              {
                      (isOnWatchlist)?
                      (<button className="btn btn-secondary" onClick={toggleAddToWatchlist}> Watchlisted</button>):
                      (<button className="btn btn-warning" onClick={toggleAddToWatchlist}> Add to Watchlist</button>)

                    }
              </div>
              <div className="row m-1">
                    {
                      (isFavorited)?
                      (<button className="btn btn-success" onClick={toggleAddToFavorites}> Favorited</button>):
                      (<button className="btn btn-danger" onClick={toggleAddToFavorites}> Add to Favorites</button>)

                    }
              </div>
    
        </div>
      </div>
    )
}
