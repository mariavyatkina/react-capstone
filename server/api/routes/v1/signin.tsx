const User1 = require("../../models/User");
const UserSession = require("../../models/UserSession");
const Movie = require("../../models/Movie");
const express1 = require("express");
const router = express1.Router();
const cors1 = require("cors");

//const API_ACCOUNT_PATH = process.env.API_ACCOUNT_PATH;
//console.log(API_ACCOUNT_PATH);
  router.use(cors1());
router.get('/status', (req:any, res:any) => {
  return res.send("OK!")
})
    //signup request
  router.post('/api/account/signup', (req: any, res: any, next: any) => {
        const {body} = req;
        const{username, password} = body;
        let {email} = body;
        if(!username){
            return res.send({
                success: false,
                message: 'Error: Username cannot be blank'
            })
        }
        if(!email){
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank'
            })
        }
        if(!password){
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank'
            })
        }
        

        email = email.toLowerCase();

        // Steps:
        // 1. Verify email doesn't exists
        // 2. Save 
        User1.find({ 
            email: email
        }, (err: any, previousUsers: any) => {
            if(err){
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                })
            }
            else if(previousUsers.length > 0){
                return res.send({
                    success: false,
                    message: 'Error: Account already exists.'
                })
            }

            const newUser = new User1();
            newUser.email = email;
            newUser.username = username;
            newUser.password = newUser.generateHash(password);
            newUser.save((err: any, user: any) => {
                if(err){
                    return res.send({
                        success: false,
                        message: 'Error: Server Error'
                    }) 
                }
                return res.send({
                    success: true,
                    message: 'Signed up'
                })
            })

        });

    })

    //signin request
  router.post('/api/account/signin', (req: any, res: any, next: any) => {
        const {body} = req;
        const{username, password} = body;
        let {email} = body;

        if(!email){
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank'
            })
        }
        if(!password){
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank'
            })
        }

        email = email.toLowerCase();

        User1.find({
            email: email
        }, (err: any, users: any) => {
            if(err){
                return res.send({
                    success: false,
                    message: "Error: Server Error"
                });
            }
            if(users.length !== 1){
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                })
            }
            const user = users[0];
            if(!user.validPassword(password)){
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                })
            }
            if(user.isDeleted === true){
              return res.send({
                success: false,
                message: "This user account has been deleted"
              })
            }
            const userSession = new UserSession();
            userSession.userId = user._id;
            userSession.save((err: any, doc: any) => {
                if(err){
                    return res.send({
                        success: false,
                        message: "Error: Server Error"
                    });
                }
                return res.send({
                    success: true,
                    message: 'Valid sign in',
                    token: doc._id
                })
            })
        })

    })
  router.get('/api/account/user/:sessionId', (req:any, res:any) => {
      const sessionId = req.params.sessionId;

      if(!sessionId)
      {
        return res.send({
          success: false,
          message: "No session id provided"
        })
      }

      UserSession.findById(sessionId)
      .then((userSession:any) => {
        return res.send({
          success: true,
          userId: userSession.userId,
          message: 'Successful request'
        })
      })
      .catch((err:any) => {
        return res.send({
          success: false,
          message: `Error ${err}`
        })
      })

    })
  // get user info based on id
  router.get("/api/account/:userId", (req:any, res:any, next:any) => {
    const userId = req.params.userId;

    if(!userId){
      return res.send({
        success: false,
        message: "No user email provided"
      })
    }
    User1
    .find({
      _id: userId
    })
    .then((users: any) => {
      console.log(users)
      const user = users[0];
      return res.send({
        success: true,
        id: user._id, 
        email: user.email,
        username: user.username,
        isDeleted: user.isDeleted,
        message: "Successful request"  
      })
    })
    .catch((err:any) => {
      return res.send({
        success: false,
        message: `Error: ${err.message}`
      })
    })


  })

  // reset password functionality
  router.put("/api/account/:userId", (req:any, res:any, next:any) => {
    const{body} = req;
    const{password, new_password} = body;
    const userId = req.params.userId;

    if(!userId){
      return res.send({
        success: false,
        message: "No user email provided"
      })
    }
    if(!password){
      return res.send({
        success: false,
        message: "Current password cannot be empty"
      })
    }
    if(!new_password){
      return res.send({
        success: false,
        message: "New password cannot be empty"
      })
    }
    

    User1
    .find(
      {_id: userId}
    )
    .then((users:any) => {
      const user = users[0];
      if(!user.validPassword(password)){
        return res.send({
          success: false,
          message: "Entered current password is invalid"
        })
      }
      else{
        user.password = user.generateHash(new_password);
        user.save();
        return res.send({
          success: true,
          message: "The password has been successfully updated"
        })
      }
    })
    .catch((error:any) => {
      return res.send({
        success: false,
        message: "Error: " + error.message
      })
    })

 

  })
  // delete user by userId
  router.delete("/api/account/:userId", (req:any, res:any) => {
    const userId = req.params.userId;

    if(!userId){
      return res.send({
        success: false,
        message: "Error: no userId was specified"
      })
    }

    User1.findByIdAndUpdate(userId, {
      $set: { isDeleted: true }
    },)
    .then((user:any) => {
      return res.send({
        success: true,
        message: "User has been updated successfully deleted"
      })
    })
    .catch((err:any) => {
      return res.send({
        success: false,
        message: `Error: ${err.message}`
      })
    })

  })
  // verify token request
  router.post("/api/account/verify", (req:any, res:any, next:any) => {
    /**
     * 1. Get the token
     * 2. Verify the token is one of a kind and is not deleted
     */

    // get token
    const { query } = req;
    const { token } = query; //?token=test

    // Verify the token is one of a kind and is not deleted
    UserSession.find(
      {
        _id: token,
        isDeleted: false
      },
      (err:any, sessions:any) => {
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
        } else {
          return res.send({
            success: true,
            mes: "Good"
          });
        }
      }
    );
  });

  // logout request
  router.post("/api/account/logout", (req:any, res:any, next:any) => {
    const { query } = req;
    const { token } = query; //?token=test

    // Verify the token is one of a kind and is not deleted
    UserSession.findOneAndUpdate(
      {
        _id: token,
        isDeleted: false
      },
      {
        $set: { isDeleted: true }
      },
      null,
      (err:any, sessions:any) => {
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
      }
    );
  });
// adds movie to the database
  router.post('/api/movies/:userId/add-movie/:imdbID', (req:any, res:any) => {
    const userId = req.params.userId;
    const imdbID = req.params.imdbID;

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
        userId: userId,
    }, (err: any, previuosMovies: any) => {
        if(err){
            return res.send({
                success: false,
                message: "Error: Server error"
            })
        }
        else if(previuosMovies.length > 0){
            return res.send({
                success: true,
                message: "Movie already exists in Favorites/Watchlist"
            })
        }

        const newMovie = new Movie();
        newMovie.imdbID = imdbID;
        newMovie.userId = userId;
        newMovie.save((err:any, movie:typeof Movie) =>{
            if(err){
                return res.send({
                    success: false,
                    message: "Second Error: Server Error"
                })
            }
            return res.send({
                success: true,
                 message: "Movie successfully added"
                })
        })
    })

  })
// updates isFavorited property of the movie
  router.put("/api/movies/:userId/set-favorites/:imdbID", (req:any, res:any, next:any) => {
    const{body} = req;
   
    const userId = req.params.userId;
    const imdbID = req.params.imdbID;

    if(!userId){
      return res.send({
        success: false,
        message: "Error: no userId was specified"
      })
    }
    if(!imdbID){
      return res.send({
        success: false,
        message: "Error: no imdbID was specified"
      })
    }

    Movie.findOne({
      userId: userId,
      imdbID: imdbID
    })
    .then((movie:any) => {
      movie.isFavorited = !movie.isFavorited;
      movie.save();
      const successMessage = 
          (movie.isFavorited)
          ?("Movie has been favorited")
          :("Movie has been removed from favorites");
      return res.send({
        success: true,
        message: successMessage
      })
    })
    .catch((err:any) => {
      return res.send({
        success: false,
        message: `Error: ${err.message}`
      })
    })
  })
  router.get("/api/movies/:userId/:imdbID", (req:any, res:any, next:any) => {
    const{body} = req;
   
    const userId = req.params.userId;
    const imdbID = req.params.imdbID;

    if(!userId){
      return res.send({
        success: false,
        message: "Error: no userId was specified"
      })
    }
    if(!imdbID){
      return res.send({
        success: false,
        message: "Error: no imdbID was specified"
      })
    }

    Movie.findOne({
      userId: userId,
      imdbID: imdbID
    })
    .then((movie:any) => {
      return res.send({
        success: true,
        isFavorited: movie.isFavorited,
        isOnWatchlist: movie.isOnWatchlist,
        message: "Request completed"
      })
    })
    .catch((err:any) => {
      return res.send({
        success: false,
        message: `Error: ${err.message}`
      })
    })
  })
// updates isOnWatchlist property of the movie
  router.put("/api/movies/:userId/set-watchlist/:imdbID", (req:any, res:any, next:any) => {
    const{body} = req;
   
    const userId = req.params.userId;
    const imdbID = req.params.imdbID;

    if(!userId){
      return res.send({
        success: false,
        message: "Error: no userId was specified"
      })
    }
    if(!imdbID){
      return res.send({
        success: false,
        message: "Error: no imdbID was specified"
      })
    }

    Movie.findOne({
      userId: userId,
      imdbID: imdbID
    })
    .then((movie:any) => {
      movie.isOnWatchlist = !movie.isOnWatchlist;
      movie.save();
      const successMessage = 
          (movie.isOnWatchlist)
          ?("Movie has been added to watchlist")
          :("Movie has been removed from the watchlist");
      return res.send({
        success: true,
        message: successMessage
      })
    })
    .catch((err:any) => {
      return res.send({
        success: false,
        message: `Error: ${err.message}`
      })
    })
  })
  router.get("/api/account/favorites/:userId", (req:any, res:any) => {
      const userId = req.params.userId;

      if(!userId) {
        return res.send({
          success: false,
          message: "Error: no userId was specified"
        })
      }

      Movie.find(
        {
          userId: userId,
          isFavorited: true
        }
      )
      .then((movies:any) => {
        if(movies.length < 1){
          return res.send({
            success: false,
            message: "No movies have been favorited"
          })
        }
        const imdbs = movies.map((movie:any) => {
          return movie.imdbID
        })
        return res.send({
          imdbs: imdbs,
          message: "Completed request",
          success: true
        })
      })
      .catch((err:any) =>{
        return res.send({
          success: false,
          message: `Error: ${err.message}`
        })
      })
  })
  router.get("/api/account/watchlist/:userId", (req:any, res:any) => {
    const userId = req.params.userId;

    if(!userId) {
      return res.send({
        success: false,
        message: "Error: no userId was specified"
      })
    }

    Movie.find(
      {
        userId: userId,
        isOnWatchlist: true
      }
    )
    .then((movies:any) => {
      if(movies.length < 1){
        return res.send({
          success: false,
          message: "No movies have been added to watchlist"
        })
      }
      const imdbs = movies.map((movie:any) => {
        return movie.imdbID
      })
      return res.send({
        imdbs:imdbs,
        message: "Completed request",
        success: true
      })
    })
    .catch((err:any) =>{
      return res.send({
        success: false,
        message: `Error: ${err.message}`
      })
    })
})

module.exports = router;