// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, Spot, Review, Booking, Image, sequelize, } = require('../db/models');

const { secret, expiresIn } = jwtConfig;


// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token;
};

//Capturing a current user that is still logged in
const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
};


// Authentication: Making sure proper user is logged in based off of restorUser
// If there is no current user, return an error
const requireAuthentication = function (req, res, next) {
    if (req.user) return next();

    const err = new Error('Authentication');
    // err.title = 'Unauthorized';
    // err.errors = ['Unauthorized'];
    err.message = 'Authentication Required';
    err.status = 401;
    return next(err);
}

const requireAuthorizationSpot = async (req, res, next) => {
    const user = req.user
    const spot = await Spot.findByPk(req.params.id)

    if (spot.ownerId == user.id) return next()

    const err = new Error('Authorization');
    // err.title = 'Unauthorized';
    // err.errors = ['Unauthorized'];
    err.message = 'Forbidden';
    err.status = 403;
    return next(err);
}

const requireAuthorizationBooking = async (req, res, next) => {
    const user = req.user
    const spot = await Spot.findByPk(req.params.id)

    if (spot.ownerId !== user.id) return next()

    const err = new Error('Authorization');
    // err.title = 'Unauthorized';
    // err.errors = ['Unauthorized'];
    err.message = 'Forbidden';
    err.status = 403;
    return next(err);
}

module.exports = {
    setTokenCookie,
    restoreUser,
    requireAuthentication,
    requireAuthorizationSpot,
    requireAuthorizationBooking
};