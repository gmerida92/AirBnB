// backend/routes/api/users.js
const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User, Spot } = require('../../db/models');
const { validateLogin, validateSignup } = require('../../utils/validation_req_body.js');
const router = express.Router();


//SESSION ROUTES

// Get Current User
router.get('/myaccount', [restoreUser, requireAuth], async (req, res) => {
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

router.get("/myaccount/spots", [restoreUser, requireAuth], async (req, res) => {
    const user = req.user;
    const spots = await Spot.findAll({
        where: { ownerId: user.id },
        
    });
    // const reviews = spots.getReview();
    // console.log(reviews);
    res.json({ Spots: spots });
});


module.exports = router;