import React, {useEffect, useState, useRef} from 'react';
import BackToAccount from './BackToAccount';
import SelectedMovie from './SelectedMovie';
import{useLocation} from 'react-router-dom'
import 'whatwg-fetch';
import Axios from 'axios';
import '../styles/SelectedMovies.css'
type ListCategory = 'Favorites' | 'WatchList';

type Movie = {
    imdbID: string,
    poster_url?: string,
    title?: string
}

export default function SelectedMovieList(props:any) {
    const location: any = useLocation();
    const userId = location.state.userId;
    const category: ListCategory = location.state.category;
    const[isLoading, setIsLoading] = useState(true);
    const movieArr: Array<Movie> = [];
    const[movies, setMovies] = useState(movieArr);

    useEffect(() => {

    fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/account/${category.toLowerCase()}/${userId}`, 
      {method: 'GET',
      headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }}) 
     .then(response => response.json())
     .then(json => {
         if(json.success) {
             console.log("SUCCESS");
             if(movies.length === 0){
                json.imdbs.forEach((imdb:string) => {
                    Axios.get(`${process.env.REACT_APP_OMDB_URL}/?i=${imdb}&apikey=${process.env.REACT_APP_API_KEY}`)
                    .then((response) =>{
                        const movie={
                            imdbID: imdb, 
                            title: response.data.Title, 
                            poster_url: response.data.Poster
                        }
                        if(!movies.includes(movie)){
                        setMovies(prevState => (
                            [...prevState, movie]
                        ))}
                    })
                    .catch((error) =>
                        console.log(`Error: ${error.message}`)
                    )}
                )
            }
     }
     setIsLoading(false)
    })
     .catch(err=>{
         console.log(`Error: ${err.message}`)
     })

     console.log("userId: " + userId)
    
    }, [isLoading, movies])
    function removeMovie(imdbID: string){
        console.log("ImdbID: " + imdbID)
    }
    if(isLoading ){
        return(<div><p>Loading...</p></div>)
    }
 
    console.log(movies)
    return (
        <div className="container-fluid movie-app">
            <BackToAccount/>
            <h3>My {category}</h3>
            <div className="row">
            {movies.map((movie,index) =>{
                return (
                    <SelectedMovie movie={movie} category={category} userId={userId} movies={movies} setMovies={setMovies}/>
                )
            })}
            </div>
    
        </div>
    )
}
