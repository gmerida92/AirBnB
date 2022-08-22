const express = require('express');
const { setTokenCookie, restoreUser, requireAuthentication, requireAuthorizationSpot, requireAuthorizationBooking, requireAuthorizationReview, requireAuthorizationUserBooking } = require('../../utils/auth.js');
const { User, Spot, Review, Booking, Image } = require('../../db/models');
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { validateSpot, validateReview, validateEndDate, validateQueryParameters } = require('../../utils/validation_req_body.js');
const router = express.Router();

// Update and return existing booking
router.put('/:id', [restoreUser, requireAuthentication, requireAuthorizationUserBooking, validateEndDate], async (req, res) =>{
    const user = req.user;
    const {id} = req.params;
    const {startDate, endDate} = req.body;

    const booking = await Booking.findByPk(id);
    await booking.update({
        startDate: startDate,
        endDate: endDate
    })

    res.json(booking)
});


// Delete an existing booking
router.delete('/:id', [restoreUser, requireAuthentication, requireAuthorizationUserBooking], async (req, res) => {
    const user = req.user;
    const {id} = req.params;

    const booking = await Booking.findByPk(id);
    await booking.destroy();

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
});

module.exports = router;