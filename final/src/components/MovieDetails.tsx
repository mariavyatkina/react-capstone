import React from 'react'
import {useLocation} from 'react-router-dom'
export default function MovieDetails() {
    const location: any = useLocation();
    const movieDetails = location.state.movieDetails;
    return (
        <div className="card movie-details movie-card">
        <img className="card-img-top" src={movieDetails.Poster} alt="Card image cap"/>
        <div className="card-body bg-dark">
          <h5 className="card-title">{movieDetails.Title} - {movieDetails.Year} - {movieDetails.Rated}</h5>
          <p className="card-text">
            Released :  {movieDetails.Released}<br/>
            Runtime :  {movieDetails.Runtime}<br/>
             Genre :  {movieDetails.Genre}<br/>
             Director :  {movieDetails.Director}<br/>
             Writer :  {movieDetails.Writer}<br/>
             Actors :  {movieDetails.Actors}<br/>
             Plot :  {movieDetails.Plot}<br/>
             Language :  {movieDetails.Language}<br/>
             Country :  {movieDetails.Country}<br/>
             Awards :  {movieDetails.Awards}<br/>
          </p>
        
        </div>
      </div>
    )
}
