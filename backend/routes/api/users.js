// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');

const { User } = require('../../db/models');

const router = express.Router();


//SESSION ROUTES

// Sign Up
router.post('/signup', async (req, res, next) => {
    const { firstName, lastName, email, username, password } = req.body;
    const user = await User.signup({
        firstName,
        lastName,
        email,
        username,
        password
    });

    await setTokenCookie(res, user);
    return res.json({
        user
    }); // Will change, edit, or add to match API Doc-20220813
});

// Get Current User
router.get('/myaccount', restoreUser, async (req, res) => {
    const { user } = req;
    if (user) {
        return res.json({
            user: user.toSafeObject()
        });
    }
    else {
        return res.json({});
    };
});

// Log In
router.post('/login', async (req, res, next) => {
    const { credential, password } = req.body;
    const user = await User.login({ credential, password });

    if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login Failure';
        err.errors = ['Ther provided credentials were invalid.'];
        return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
        user
    }); // Will change, edit, or add to match API Doc-20220813
});

// Log Out
router.delete('/logout', async (req, res, next) => {
    res.clearCookie('token');
    return res.json({
        message: 'Logout Successful'
    });
});


module.exports = router;