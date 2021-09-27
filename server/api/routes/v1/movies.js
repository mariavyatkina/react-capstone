var Movie = require("../../models/Movie");
var express2 = require("express");
var router1 = express2.Router();
var cors2 = require("cors");
router1.use(cors2);
var toyStory = new Movie();
router1.post('/add-movie', function (req, res) {
    var body = req.body;
    var imdbID = body.imdbID, userId = body.userId;
    if (!imdbID) {
        return res.send({
            success: false,
            message: "Error: No imdbID was provided"
        });
    }
    if (!userId) {
        return res.send({
            success: false,
            message: "Error: No userId was provided"
        });
    }
    Movie.find({
        imdbID: imdbID
    }, function (err, previosMovies) {
        if (err) {
            return res.send({
                success: false,
                message: "Error: Server error"
            });
        }
        else if (previosMovies > 0) {
            return res.send({
                success: false,
                message: "Error: Movie already exists in Favorites"
            });
        }
        var newMovie = new Movie();
        newMovie.imdbID = imdbID;
        newMovie.userId = userId;
        newMovie.save(function (err, movie) {
            if (err) {
                return res.send({
                    success: false,
                    message: "Error: Server Error"
                });
            }
            return res.send({
                success: true,
                message: "Movie successfully added"
            });
        });
    });
});
module.exports = router1;
