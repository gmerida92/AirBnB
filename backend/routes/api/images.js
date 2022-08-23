const express = require('express');
const { setTokenCookie, restoreUser, requireAuthentication, requireAuthorizationSpot, requireAuthorizationBooking, requireAuthorizationReview, requireAuthorizationUserBooking, requireAuthorizationImage } = require('../../utils/auth.js');
const { User, Spot, Review, Booking, Image } = require('../../db/models');
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { validateSpot, validateReview, validateEndDate, validateQueryParameters } = require('../../utils/validation_req_body.js');
const router = express.Router();

// IMAGE ROUTES

// Delete an existing image
router.delete('/:id', [restoreUser, requireAuthentication, requireAuthorizationImage], async (req, res) => {
    const user = req.user;
    const { id } = req.params;

    const image = await Image.findByPk(id);
    await image.destroy();

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
});

module.exports = router;