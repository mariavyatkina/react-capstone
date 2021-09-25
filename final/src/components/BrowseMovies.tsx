import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import MovieList from './MovieList';
import Axios from 'axios';
import '../styles/BrowseMovies.css'
export default function BrowseMovies() {
    
    const [movieTitle, setMovieTitle] = useState("");
    const [movies, setMovies] = useState([]);
    const[isLoading, setIsLoading] = useState(false);

    function onSearchBarChange(event: any) {
        setMovieTitle(event.target.value);
        console.log("Current MT: " + movieTitle);
    }

    function toggleSearchMovies(){
        setIsLoading(true);
        Axios.get(`https://www.omdbapi.com/?s=${movieTitle}&apikey=${process.env.REACT_APP_API_KEY}`)
        .then((response) =>{
        console.log(response.data);
        if(response.data.Response === "True"){ 
            setIsLoading(false);
            setMovies(response.data.Search)
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
    }
    if(isLoading){
        return(<div><p>Loading...</p></div>)
    }
    return (
        <div className="browse-movies">
            <nav>
                <div><Link className="btn btn-success m-2" to="/account">MyAccount</Link></div>
            </nav>
           <div>
            <div className="input-group m-2">
                 <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                    aria-describedby="search-addon" onChange={onSearchBarChange}/>
                <button type="button" className="btn btn-outline-primary" onClick={toggleSearchMovies}>Search Movies</button>
             </div>  
             <MovieList movies={movies}/>
            </div>
        </div>
    )
}
