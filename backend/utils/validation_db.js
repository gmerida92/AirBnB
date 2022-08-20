const { ValidationError } = require('sequelize');

const sequelizeErrorHandler = async (err, req, res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {

        const errors = new Object();

        err.errors.forEach((validationErrorItem) => {
            errors[validationErrorItem.path] = validationErrorItem.message;
        });
        err.message = "Sequilize Validation Error";
        err.status = 403;
        err.errors = errors;
        next(err);
    }
    next()
}

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


module.exports = {
    sequelizeErrorHandler,
    checkUser
};