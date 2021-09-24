const User1 = require("../../models/User");
const UserSession = require("../../models/UserSession");
const express1 = require("express");
const router = express1.Router();
const cors1 = require("cors");

//const API_ACCOUNT_PATH = process.env.API_ACCOUNT_PATH;
//console.log(API_ACCOUNT_PATH);
    router.use(cors1());

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
  // get user info based on id
  router.get("/api/account/:email", (req:any, res:any, next:any) => {
    const email = req.params.email;
    console.log("user email: " + email)
    if(!email){
      return res.send({
        success: false,
        message: "No user email provided"
      })
    }
    User1
    .find({
      email: email
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
  router.put("/api/account/:email", (req:any, res:any, next:any) => {
    const{body} = req;
    const{password, new_password} = body;
    const email = req.params.email;
    console.log("user email: " + email)
    if(!email){
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
      {email:email}
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


module.exports = router;