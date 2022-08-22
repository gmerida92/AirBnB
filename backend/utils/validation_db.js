const { User, Spot, Review, Booking, Image, sequelize, } = require('../db/models');


const checkUser = async (err, req, res, next) => {
    err.message = "User already exists"
    err.status = 403

    if (err.errors.email) {
        err.errors.email = 'User with that email already exists'
    }

    if (err.errors.username) {
        err.errors.username = 'User with that username already exists'
    }
    next(err);
};

const checkSpot = async (err, req, res, next) => {
    const spot = await Spot.findByPk(req.params.id)
    if(!spot) {
        const err = new Error("Spot not found");
        err.message = "Spot couldn't be found";
        err.status = 404;
        return next(err)
    }
};


module.exports = {
    checkUser,
    checkSpot
};