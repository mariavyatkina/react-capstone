import React, {useEffect, useState} from 'react'
import "../styles/Movie.css"
import Axios from 'axios';
import {Link} from 'react-router-dom'

export default function Movie(props: any) {
    
    const[movieDetails, setMovieDetails] = useState({});
    const[isLoading, setIsLoading] = useState(true);
    useEffect(() =>{

        Axios.get(`https://www.omdbapi.com/?i=${props.movie.imdbID}&apikey=${process.env.REACT_APP_API_KEY}`)
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

    }, [])
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
          <div className="row">
          <Link to={{pathname:"/account/browse-movies/movie-details", state:{movieDetails: movieDetails}}}className="btn btn-primary">Details</Link>
          </div>
          <div className="row mt-3">
              <div className="col-md-6">
                  <button className="btn btn-warning">Add to WatchList</button>
              </div>
              <div className="col-md-6">
                  <button className="btn btn-danger">Add to Favorites</button>
              </div>
          </div>
        </div>
      </div>
    )
}
