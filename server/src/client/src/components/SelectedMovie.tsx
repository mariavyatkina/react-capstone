import React from 'react'
import 'whatwg-fetch';

export default function SelectedMovie(props:any) {

    function toggleRemoveMovie(){
        console.log("imdbID: " + props.movie.imdbID)

        fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/movies/${props.userId}/set-${props.category}/${props.movie.imdbID}`, 
        {method: 'PUT',
      headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
      .then(response => response.json())
      .then(json=> {
            if(json.success){
                const newMovies = props.movies.filter((movie:any )=> movie.imdbID !== props.movie.imdbID)
                props.setMovies(newMovies);
            }
      })
    }

    return (
        <div className="col-3 selected-movie">
                    <button className="btn btn-dark remove-button" onClick={toggleRemoveMovie}>
                        Remove</button>
                    <img 
                        src={props.movie.poster_url} 
                        alt="selected-movie"/>
                    </div>
    )
}
