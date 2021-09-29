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
            <h5 className="text-light text-center pt-3 pb-3">{
                (props.isSearched)?
                ("Search Results:"):
                ("Your search results will be displayed here")
                } </h5>
            <div className="row movie-list">
                {movieList}
            </div>
            </div>
        )

    
}
