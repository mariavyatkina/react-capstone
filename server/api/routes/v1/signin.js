var User1 = require("../../models/User");
var UserSession = require("../../models/UserSession");
var express1 = require("express");
var router = express1.Router();
var cors1 = require("cors");
require('dotenv').config();
//const API_ACCOUNT_PATH = process.env.API_ACCOUNT_PATH;
//console.log(API_ACCOUNT_PATH);
router.use(cors1());
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
            mes: "Good"
        });
    });
});
module.exports = router;
