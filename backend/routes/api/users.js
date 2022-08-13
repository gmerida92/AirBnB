// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');

const { User } = require('../../db/models');

const router = express.Router();

//SESSION ROUTES

// Log In
router.post('/login', async (req, res, next) => {
    const {credential, password} = req.body;
    const user = await User.login({credential, password});

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
    }); // Will change, edit, or add to match API DOC-20220813
});

// Log Out
router.delete('/logout', async (req, res, next) => {
    res.clearCookie('token');
    return res.json({
        message: 'Logout Successful'
    });
});


module.exports = router;