const Movie = require("../../models/Movie");
const express2 = require("express");

const router1 = express2.Router();
const cors2 = require("cors")

router1.use(cors2);
const toyStory = new Movie();

router1.post('/add-movie', (req:any, res:any) => {
    const {body} = req;
    const {imdbID, userId} = body;

    if(!imdbID) {
        return res.send({
            success: false,
            message: "Error: No imdbID was provided"
        })
    }
    if(!userId) {
        return res.send({
            success: false,
            message: "Error: No userId was provided"
        })
    }

    Movie.find({
        imdbID: imdbID,
    }, (err: any, previosMovies: any) => {
        if(err){
            return res.send({
                success: false,
                message: "Error: Server error"
            })
        }
        else if(previosMovies > 0){
            return res.send({
                success: false,
                message: "Error: Movie already exists in Favorites"
            })
        }

        const newMovie = new Movie();
        newMovie.imdbID = imdbID;
        newMovie.userId = userId;
        newMovie.save((err:any, movie:typeof Movie) =>{
            if(err){
                return res.send({
                    success: false,
                    message: "Error: Server Error"
                })
            }
            return res.send({
                success: true,
                 message: "Movie successfully added"
                })
        })
    })

})

module.exports = router1;