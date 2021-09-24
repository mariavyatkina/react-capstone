var User1 = require("../../models/User");
var UserSession = require("../../models/UserSession");
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
module.exports = router;
