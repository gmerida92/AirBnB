// backend/routes/api/index.js
const router = require('express').Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User, Spot, Review, Booking, Image } = require('../../db/models');


const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewRouter = require('./reviews.js');
const bookingRouter = require('./bookings.js');

router.use(restoreUser);

router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewRouter);
router.use('/bookings', bookingRouter);

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;

// TESTING ROUTES FOR UTILS MIDDLEWARE-AUTH.JS
// // GET /api/set-token-cookie
// router.get('/set-token-cookie', async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'Spiderman'
//         }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
// });


// // GET /api/restore-user
// router.use(restoreUser);

// router.get('/restore-user', (req, res) => {
//     return res.json(req.user);
// }
// );


// // GET /api/require-auth
// router.get(
//     '/require-auth',
//     requireAuth,
//     (req, res) => {
//         return res.json(req.user);
//     }
// );