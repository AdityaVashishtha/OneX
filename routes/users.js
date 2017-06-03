const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');

//Register
router.post('/register', (req, res) => {
    //console.log(req.body);
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    console.log("request received");
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({
                success: false,
                message: 'Failed to register User!',
                error: err
            });
        } else {
            res.json({
                success: true,
                message: 'User registered!'
            });
        }
    });
});

//Authenticate
router.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 3600
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        name: user.name,
                        id: user._id,
                        email: user.email,
                        username: user.username
                    }
                });
            } else {
                return res.json({
                    success: false,
                    message: "Wrong username or password"
                });
            }
        });
    });

});

//Profile
router.get('/profile', (req, res) => {
    res.send('PROFILE');
});

module.exports = router;