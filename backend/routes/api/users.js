// backend/routes/api/users.js
const express = require('express');
const { setTokenCookie, restoreUser, requireAuthentication } = require('../../utils/auth.js');
const { User, Spot, Review, Booking, Image, sequelize, } = require('../../db/models');
const { validateLogin, validateSignup } = require('../../utils/validation_req_body.js');
const router = express.Router();


//SESSION ROUTES

// Restore Session User/Get Current User
router.get('/myaccount', [restoreUser, requireAuthentication], async (req, res) => {
    const { user } = req;
    if (user) {
        return res.json(user.toSafeObject());
    }
    else {
        return res.json({});
    };
});


// Login
router.post('/login', [validateLogin], async (req, res, next) => {
    const { credential, password } = req.body;
    const user = await User.login({ credential, password });

    if (!user) {
        const err = new Error('Invalid credentials');
        err.message = 'Invalid credential';
        err.status = 401;
        next(err)
    }



    user.dataValues.token = await setTokenCookie(res, user);

    return res.json(user);
});


// Sign Up
router.post('/signup', [validateSignup], async (req, res, next) => {
    const { firstName, lastName, email, username, password } = req.body;

    const checkUserByEmail = await User.findOne({
        where: { email: email }
    })

    const checkUserByUsername = await User.findOne({
        where: { username: username }
    })

    if (checkUserByEmail) { 
        const err = new Error('User already exists');
        err.message = 'User already exists';
        err.status = 403;
        err.errors = {email: "User with that email already exists"}
        return next(err)
    };

    if (checkUserByUsername) { 
        const err = new Error('User already exists');
        err.message = 'User already exists';
        err.status = 403;
        err.errors = {username: "User with that username already exists"}
        return next(err)
    }

    const user = await User.signup({
        firstName,
        lastName,
        email,
        username,
        password
    });

    user.dataValues.token = await setTokenCookie(res, user);
    return res.json(user); // Will change, edit, or add to match API Doc-20220813
});



// Log Out
router.delete('/logout', async (req, res, next) => {
    res.clearCookie('token');
    return res.json({
        message: 'Logout Successful'
    });
});


//USER ROUTES

//Get all Spots owned by the Current User
router.get("/myaccount/spots", [restoreUser, requireAuthentication], async (req, res) => {
    const user = req.user; 

    const spots = await Spot.findAll({
        where: { ownerId: user.id }
    });

    for (i = 0; i < spots.length; i++) {

        const numReviews = await Review.count({
            where: { spotId: spots[i].dataValues.id }
        })

        const sumStars = await Review.sum("stars", {
            where: { spotId: spots[i].dataValues.id }
        });

        const avgStarRating = sumStars / numReviews;
        spots[i].dataValues.avgRating = avgStarRating;
    };

    res.json({
        Spots: spots
    });
});


// Get all Reviews of the Current User
router.get('/myaccount/reviews', [restoreUser, requireAuthentication], async (req, res) => {
    const user = req.user;

    const reviews = await Review.findAll({
        where: { userId: user.id },
        include: [
            {
                model: User,
                attributes: { exclude: ['email', 'username', 'password', 'createdAt', 'updatedAt'] }
            },
            {
                model: Spot,
                attributes: { exclude: [ 'previewImage', 'description', 'createdAt', 'updatedAt'] }
            },
            {
                model: Image,
                attributes: { exclude: ['userId', 'imageableType', 'createdAt', 'updatedAt'] }
            }
        ]
    });

    res.json({
        Reviews: reviews
    })
});


// Get all of the Current User's Bookings
router.get('/myaccount/bookings', [restoreUser, requireAuthentication], async (req, res) => {
    const user = req.user;

    const bookings = await Booking.findAll({
        where: { userId: user.id },
        include: [
            {
                model: Spot,
                attributes: { exclude: ['description', 'createdAt', "updatedAt"] }
            }
        ],
    })

    res.json({
        Bookings: bookings
    });
});

module.exports = router;