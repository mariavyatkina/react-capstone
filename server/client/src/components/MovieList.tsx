import React from 'react'
import Movie from './Movie'

export default function MovieList(props: any) {

        const movieList = props.movies.filter((movie:any)=>
        (movie.Poster !== "N/A")
        ).map((movie: any) =>{
             return <Movie movie={movie}/>
        })

        return(
            <div>
            Search Results: 
            <div className="row movie-list">
                {movieList}
            </div>
            </div>
        )

    
}
