// backend/utils/validation.js
const { check, validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {

        const errors = new Object();
        validationErrors
        .array()
        .forEach((errObjDet) => {
            let errValidKey = errObjDet.param;
            if(!errors[errValidKey]){
                errors[errValidKey] = errObjDet.msg;
            }
        });

        const err = Error('Validation Error');
        err.message = 'Validation Error';
        err.errors = errors
        err.status = 400;
        // err.title = 'Bad request.';
        next(err);
    }
    
    next();
};


// Validate Login Body
const validateLogin = [
    check('credential', 'Email or username is required')
        .exists({ checkFalsy: true })
        .isEmail()
        .notEmpty(),
    check('password', 'Password is required')
        .exists({ checkFalsy: true }),
    handleValidationErrors
];

// Validate Signup Body
const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid first name.'),
    check('firstName')
        .not()
        .isEmail()
        .withMessage('First name cannot be an email.'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid last name.'),
    check('lastName')
        .not()
        .isEmail()
        .withMessage('Last name cannot be an email.'),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

module.exports = {
    handleValidationErrors,
    validateLogin,
    validateSignup
};