const express = require('express');
const { setTokenCookie, restoreUser, requireAuthentication, requireAuthorizationSpot, requireAuthorizationBooking, requireAuthorizationReview, requireAuthorizationUserBooking } = require('../../utils/auth.js');
const { User, Spot, Review, Booking, Image } = require('../../db/models');
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { validateSpot, validateReview, validateEndDate, validateQueryParameters } = require('../../utils/validation_req_body.js');
const router = express.Router();

// Edit a Booking
router.put('/:id', [restoreUser, requireAuthentication, requireAuthorizationUserBooking, validateEndDate], async (req, res, next) => {
    const user = req.user;
    const { id } = req.params;
    const { startDate, endDate } = req.body;

    const booking = await Booking.findByPk(id);

    const allOtherBookingsForSpot = await Booking.findAll({
        where: { spotId: booking.spotId }
    })

    let currentBookedStartDate = new Date(booking.startDate);
    let currentBookedEndDate = new Date(booking.endDate);
    let newStartDate = new Date(startDate);
    let newEndDate = new Date(endDate);
    let todayDate = Date.now();

    if ((todayDate >= currentBookedEndDate.getTime()) || (todayDate >= newEndDate.getTime()) ||
        (todayDate >= currentBookedStartDate.getTime() && todayDate <= currentBookedEndDate.getTime())) {

        const err = new Error("Past bookings can't be modified");
        err.status = 403;
        return next(err);
    }

    const err = new Error("Sorry, this spot is already booked for the specified dates");
    err.status = 403;
    err.errors = {};

    for (let i = 0; i < allOtherBookingsForSpot.length; i++) {
        let otherBookedStartDate = new Date(allOtherBookingsForSpot[i].startDate);
        let otherBookedEndDate = new Date(allOtherBookingsForSpot[i].endDate);

        if (allOtherBookingsForSpot[i].id !== id) {
            if (newStartDate.getTime() >= otherBookedStartDate.getTime() && newStartDate.getTime() <= otherBookedEndDate.getTime()) {
                err.errors['startDate'] = "Start date conflicts with an existing booking"
            }
            if (newEndDate.getTime() >= otherBookedStartDate.getTime() && newEndDate.getTime() <= otherBookedEndDate.getTime()) {
                err.errors['endDate'] = "End date conflicts with an existing booking"
            }
            if (newStartDate.getTime() <= otherBookedStartDate.getTime() && newEndDate.getTime() >= otherBookedEndDate.getTime()) {
                err.errors['startDate'] = "Start date conflicts with an existing booking"
                err.errors['endDate'] = "End date conflicts with an existing booking"
            }
            if (Object.keys(err.errors).length > 0) {
                return next(err)
            }
        }
    }

    await booking.update({
        startDate: startDate,
        endDate: endDate
    })

    res.json(booking)
});


// Delete an existing booking
router.delete('/:id', [restoreUser, requireAuthentication, requireAuthorizationUserBooking], async (req, res, next) => {
    const user = req.user;
    const { id } = req.params;

    const booking = await Booking.findByPk(id);

    let currentBookedStartDate = new Date(booking.startDate);
    let currentBookedEndDate = new Date(booking.endDate);

    let todayDate = Date.now();

    if ((todayDate >= currentBookedStartDate.getTime() && todayDate <= currentBookedEndDate.getTime())) {
        const err = new Error("Bookings that have been started can't be deleted");
        err.status = 403;
        return next(err);
    }

    await booking.destroy();

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
});

module.exports = router;