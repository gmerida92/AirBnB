// backend/routes/api/index.js
const router = require('express').Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User, Spot, Review, Booking, Image } = require('../../db/models');


const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewRouter = require('./reviews.js');
const bookingRouter = require('./bookings.js');
const imageRouter = require('./images.js')

router.use(restoreUser);

router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewRouter);
router.use('/bookings', bookingRouter);
router.use('/images', imageRouter);

// router.post('/test', function (req, res) {
//     res.json({ requestBody: req.body });
// });

module.exports = router;