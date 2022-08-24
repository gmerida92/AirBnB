const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

console.log("TEST")

const app = express();

// middleqare for logging information about requests and responses
app.use(morgan('dev'));

//middleware for parsing cookies and the express.json middleware for parsing JSON bodies of requests with Content-Type of "application/json".
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

// // Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

// backend/app.js
const routes = require('./routes');
const { sequelize } = require('./db/models');

app.use(routes); // Connect all the routes


// backend/app.js
// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});


// backend/app.js
// Process Sequelize errors
const { ValidationError } = require('sequelize');
app.use((err, req, res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {

        const errors = new Object();

        err.errors.forEach((validationErrorItem) => {
            errors[validationErrorItem] = validationErrorItem;
        });
        err.message = "Sequelize Validation Error";
        err.status = 403;
        err.errors = errors;
    }
    next(err);
});


// backend/app.js
// Error formatter
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        // title: err.title || 'Server Error',
        message: err.message,
        statusCode: err.status,
        errors: err.errors,
        // stack: isProduction ? null : err.stack
    });
});

// backend/app.js
module.exports = app;