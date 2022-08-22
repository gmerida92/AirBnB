// backend/utils/validation.js
const { query } = require('express');
const { check, validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleReqBodyValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {

        const errors = new Object();
        validationErrors
            .array()
            .forEach((errObjDet) => {
                let errValidKey = errObjDet.param;
                if (!errors[errValidKey]) {
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
    handleReqBodyValidationErrors
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
    handleReqBodyValidationErrors
];

// Validate Spot
const validateSpot = [
    check('address', 'Street address is required')
        .exists({ checkFalsy: true }),
    check('state', 'City is required')
        .exists({ checkFalsy: true }),
    check('country', 'State is required')
        .exists({ checkFalsy: true }),
    check('lat', 'Latitude is not valid')
        .exists({ checkFalsy: true }),
    check('lng', 'Longitude is not valid')
        .exists({ checkFalsy: true }),
    check('name', 'Name must be less than 50 characters')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 }),
    check('description', 'Description is required')
        .exists({ checkFalsy: true }),
    check('price', 'Price per day is required')
        .exists({ checkFalsy: true }),
    handleReqBodyValidationErrors
];

// Validate Review
const validateReview = [
    check('review', 'Review text is required')
        .exists({ checkFalsy: true }),
    check('stars', 'Stars must be an integer from 1 to 5')
        .exists()
        .isInt({ min: 1, max: 5 }),
    handleReqBodyValidationErrors
];

// Validate Booking
const validateEndDate = [
    check('endDate', 'endDate cannot be on or before startDate')
        .custom((date, { req }) => {
            const endDate = new Date(date);
            const startDate = new Date(req.body.startDate);
            if (endDate === startDate || endDate < startDate) {
                return false
            }
            return true
        }),
    handleReqBodyValidationErrors
];


// Validate Query Parameters
const validateQueryParameters = [
    check('page', "Page must be greater than or equal to 0")
        .optional()
        .isInt({ min: 0 }),
    check('size', "Size must be greater than or equal to 0")
        .optional()
        .isInt({ min: 0 }),
    check('maxLat', "Maximum latitude is invalid")
        .optional()
        .isDecimal()
        .custom((value) => {
            if (value % 1 === 0) {
                return false
            }
            return true
        }),
    check('minLat', "Minimum latitude is invalid")
        .optional()
        .isDecimal()
        .custom((value) => {
            if (value % 1 === 0) {
                return false
            }
            return true
        }),
    check('maxLng', "Maximum longitude is invalid")
        .optional()
        .isDecimal()
        .custom((value) => {
            if (value % 1 === 0) {
                return false
            }
            return true
        }),
    check('minLng', "Minimum longitude is invalid")
        .optional()
        .isDecimal()
        .custom((value) => {
            if (value % 1 === 0) {
                return false
            }
            return true
        }),
    check('minPrice', "Maximum price must be greater than or equal to 0")
        .optional()
        .isDecimal({ min: 0 })
        .custom((value) => {
            if (value < 0) {
                return false
            }
            return true
        }),
    check('maxPrice', "Minumum price must be greater than or equal to 0")
        .optional()
        .isDecimal({ min: 0 })
        .custom((value) => {
            if (value < 0) {
                return false
            }
            return true
        }),
    handleReqBodyValidationErrors
];



module.exports = {
    handleReqBodyValidationErrors,
    validateLogin,
    validateSignup,
    validateSpot,
    validateReview,
    validateEndDate,
    validateQueryParameters
};