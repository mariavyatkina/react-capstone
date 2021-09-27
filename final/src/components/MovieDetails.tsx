import React from 'react'
import {useLocation} from 'react-router-dom'
import "../styles/MovieDetails.css"
export default function MovieDetails() {
    const location: any = useLocation();
    const movieDetails = location.state.movieDetails;
    return (
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
            <div className="form-group row">
              <button className="btn col-md-5 col-sm-12 m-1 p-2 btn-warning">Add To Watchlist</button>
              <button className="btn col-md-5 col-sm-12 m-1 p-2 btn-danger">Add To Favorites</button>
            </div>
        </div>
      </div>
    )
}
