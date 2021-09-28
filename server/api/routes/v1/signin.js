var User1 = require("../../models/User");
var UserSession = require("../../models/UserSession");
var Movie = require("../../models/Movie");
var express1 = require("express");
var router = express1.Router();
var cors1 = require("cors");
//const API_ACCOUNT_PATH = process.env.API_ACCOUNT_PATH;
//console.log(API_ACCOUNT_PATH);
router.use(cors1());
//signup request
router.post('/api/account/signup', function (req, res, next) {
    var body = req.body;
    var username = body.username, password = body.password;
    var email = body.email;
    if (!username) {
        return res.send({
            success: false,
            message: 'Error: Username cannot be blank'
        });
    }
    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank'
        });
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank'
        });
    }
    email = email.toLowerCase();
    // Steps:
    // 1. Verify email doesn't exists
    // 2. Save 
    User1.find({
        email: email
    }, function (err, previousUsers) {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server Error'
            });
        }
        else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                message: 'Error: Account already exists.'
            });
        }
        var newUser = new User1();
        newUser.email = email;
        newUser.username = username;
        newUser.password = newUser.generateHash(password);
        newUser.save(function (err, user) {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });
            }
            return res.send({
                success: true,
                message: 'Signed up'
            });
        });
    });
});
//signin request
router.post('/api/account/signin', function (req, res, next) {
    var body = req.body;
    var username = body.username, password = body.password;
    var email = body.email;
    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank'
        });
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank'
        });
    }
    email = email.toLowerCase();
    User1.find({
        email: email
    }, function (err, users) {
        if (err) {
            return res.send({
                success: false,
                message: "Error: Server Error"
            });
        }
        if (users.length !== 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        }
        var user = users[0];
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        }
        if (user.isDeleted === true) {
            return res.send({
                success: false,
                message: "This user account has been deleted"
            });
        }
        var userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save(function (err, doc) {
            if (err) {
                return res.send({
                    success: false,
                    message: "Error: Server Error"
                });
            }
            return res.send({
                success: true,
                message: 'Valid sign in',
                token: doc._id
            });
        });
    });
});
router.get('/api/account/user/:sessionId', function (req, res) {
    var sessionId = req.params.sessionId;
    if (!sessionId) {
        return res.send({
            success: false,
            message: "No session id provided"
        });
    }
    UserSession.findById(sessionId)
        .then(function (userSession) {
        return res.send({
            success: true,
            userId: userSession.userId,
            message: 'Successful request'
        });
    })["catch"](function (err) {
        return res.send({
            success: false,
            message: "Error " + err
        });
    });
});
// get user info based on id
router.get("/api/account/:userId", function (req, res, next) {
    var userId = req.params.userId;
    if (!userId) {
        return res.send({
            success: false,
            message: "No user email provided"
        });
    }
    User1
        .find({
        _id: userId
    })
        .then(function (users) {
        console.log(users);
        var user = users[0];
        return res.send({
            success: true,
            id: user._id,
            email: user.email,
            username: user.username,
            isDeleted: user.isDeleted,
            message: "Successful request"
        });
    })["catch"](function (err) {
        return res.send({
            success: false,
            message: "Error: " + err.message
        });
    });
});
// reset password functionality
router.put("/api/account/:userId", function (req, res, next) {
    var body = req.body;
    var password = body.password, new_password = body.new_password;
    var userId = req.params.userId;
    if (!userId) {
        return res.send({
            success: false,
            message: "No user email provided"
        });
    }
    if (!password) {
        return res.send({
            success: false,
            message: "Current password cannot be empty"
        });
    }
    if (!new_password) {
        return res.send({
            success: false,
            message: "New password cannot be empty"
        });
    }
    User1
        .find({ _id: userId })
        .then(function (users) {
        var user = users[0];
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: "Entered current password is invalid"
            });
        }
        else {
            user.password = user.generateHash(new_password);
            user.save();
            return res.send({
                success: true,
                message: "The password has been successfully updated"
            });
        }
    })["catch"](function (error) {
        return res.send({
            success: false,
            message: "Error: " + error.message
        });
    });
});
// delete user by userId
router["delete"]("/api/account/:userId", function (req, res) {
    var userId = req.params.userId;
    if (!userId) {
        return res.send({
            success: false,
            message: "Error: no userId was specified"
        });
    }
    User1.findByIdAndUpdate(userId, {
        $set: { isDeleted: true }
    })
        .then(function (user) {
        return res.send({
            success: true,
            message: "User has been updated successfully deleted"
        });
    })["catch"](function (err) {
        return res.send({
            success: false,
            message: "Error: " + err.message
        });
    });
});
// verify token request
router.post("/api/account/verify", function (req, res, next) {
    /**
     * 1. Get the token
     * 2. Verify the token is one of a kind and is not deleted
     */
    // get token
    var query = req.query;
    var token = query.token; //?token=test
    // Verify the token is one of a kind and is not deleted
    UserSession.find({
        _id: token,
        isDeleted: false
    }, function (err, sessions) {
        if (err) {
            return res.send({
                success: false,
                mes: "Error: Server error"
            });
        }
        if (sessions.length != 1) {
            return res.send({
                success: false,
                mes: "Error: Invalid"
            });
        }
        else {
            return res.send({
                success: true,
                mes: "Good"
            });
        }
    });
});
// logout request
router.post("/api/account/logout", function (req, res, next) {
    var query = req.query;
    var token = query.token; //?token=test
    // Verify the token is one of a kind and is not deleted
    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    }, {
        $set: { isDeleted: true }
    }, null, function (err, sessions) {
        if (err) {
            return res.send({
                success: false,
                mes: "Error: Server error."
            });
        }
        // if there aren't any documents found by that token
        if (sessions.length != 1) {
            return res.send({
                success: false,
                mes: "Error: Invalid token."
            });
        }
        // otherwise, everything went fine and dandy
        return res.send({
            success: true,
            message: "Good"
        });
    });
});
// adds movie to the database
router.post('/api/movies/:userId/add-movie/:imdbID', function (req, res) {
    var userId = req.params.userId;
    var imdbID = req.params.imdbID;
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
        imdbID: imdbID,
        userId: userId
    }, function (err, previuosMovies) {
        if (err) {
            return res.send({
                success: false,
                message: "Error: Server error"
            });
        }
        else if (previuosMovies.length > 0) {
            return res.send({
                success: true,
                message: "Movie already exists in Favorites/Watchlist"
            });
        }
        var newMovie = new Movie();
        newMovie.imdbID = imdbID;
        newMovie.userId = userId;
        newMovie.save(function (err, movie) {
            if (err) {
                return res.send({
                    success: false,
                    message: "Second Error: Server Error"
                });
            }
            return res.send({
                success: true,
                message: "Movie successfully added"
            });
        });
    });
});
// updates isFavorited property of the movie
router.put("/api/movies/:userId/set-favorites/:imdbID", function (req, res, next) {
    var body = req.body;
    var userId = req.params.userId;
    var imdbID = req.params.imdbID;
    if (!userId) {
        return res.send({
            success: false,
            message: "Error: no userId was specified"
        });
    }
    if (!imdbID) {
        return res.send({
            success: false,
            message: "Error: no imdbID was specified"
        });
    }
    Movie.findOne({
        userId: userId,
        imdbID: imdbID
    })
        .then(function (movie) {
        movie.isFavorited = !movie.isFavorited;
        movie.save();
        var successMessage = (movie.isFavorited)
            ? ("Movie has been favorited")
            : ("Movie has been removed from favorites");
        return res.send({
            success: true,
            message: successMessage
        });
    })["catch"](function (err) {
        return res.send({
            success: false,
            message: "Error: " + err.message
        });
    });
});
router.get("/api/movies/:userId/:imdbID", function (req, res, next) {
    var body = req.body;
    var userId = req.params.userId;
    var imdbID = req.params.imdbID;
    if (!userId) {
        return res.send({
            success: false,
            message: "Error: no userId was specified"
        });
    }
    if (!imdbID) {
        return res.send({
            success: false,
            message: "Error: no imdbID was specified"
        });
    }
    Movie.findOne({
        userId: userId,
        imdbID: imdbID
    })
        .then(function (movie) {
        return res.send({
            success: true,
            isFavorited: movie.isFavorited,
            isOnWatchlist: movie.isOnWatchlist,
            message: "Request completed"
        });
    })["catch"](function (err) {
        return res.send({
            success: false,
            message: "Error: " + err.message
        });
    });
});
// updates isOnWatchlist property of the movie
router.put("/api/movies/:userId/set-watchlist/:imdbID", function (req, res, next) {
    var body = req.body;
    var userId = req.params.userId;
    var imdbID = req.params.imdbID;
    if (!userId) {
        return res.send({
            success: false,
            message: "Error: no userId was specified"
        });
    }
    if (!imdbID) {
        return res.send({
            success: false,
            message: "Error: no imdbID was specified"
        });
    }
    Movie.findOne({
        userId: userId,
        imdbID: imdbID
    })
        .then(function (movie) {
        movie.isOnWatchlist = !movie.isOnWatchlist;
        movie.save();
        var successMessage = (movie.isOnWatchlist)
            ? ("Movie has been added to watchlist")
            : ("Movie has been removed from the watchlist");
        return res.send({
            success: true,
            message: successMessage
        });
    })["catch"](function (err) {
        return res.send({
            success: false,
            message: "Error: " + err.message
        });
    });
});
router.get("/api/account/favorites/:userId", function (req, res) {
    var userId = req.params.userId;
    if (!userId) {
        return res.send({
            success: false,
            message: "Error: no userId was specified"
        });
    }
    Movie.find({
        userId: userId,
        isFavorited: true
    })
        .then(function (movies) {
        if (movies.length < 1) {
            return res.send({
                success: false,
                message: "No movies have been favorited"
            });
        }
        var imdbs = movies.map(function (movie) {
            return movie.imdbID;
        });
        return res.send({
            imdbs: imdbs,
            message: "Completed request",
            success: true
        });
    })["catch"](function (err) {
        return res.send({
            success: false,
            message: "Error: " + err.message
        });
    });
});
router.get("/api/account/watchlist/:userId", function (req, res) {
    var userId = req.params.userId;
    if (!userId) {
        return res.send({
            success: false,
            message: "Error: no userId was specified"
        });
    }
    Movie.find({
        userId: userId,
        isOnWatchlist: true
    })
        .then(function (movies) {
        if (movies.length < 1) {
            return res.send({
                success: false,
                message: "No movies have been added to watchlist"
            });
        }
        var imdbs = movies.map(function (movie) {
            return movie.imdbID;
        });
        return res.send({
            imdbs: imdbs,
            message: "Completed request",
            success: true
        });
    })["catch"](function (err) {
        return res.send({
            success: false,
            message: "Error: " + err.message
        });
    });
});
module.exports = router;
