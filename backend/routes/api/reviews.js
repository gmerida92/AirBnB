// backend/routes/api/users.js
const express = require('express');
const { setTokenCookie, restoreUser, requireAuthentication, requireAuthorizationSpot, requireAuthorizationBooking, requireAuthorizationReview } = require('../../utils/auth.js');
const { User, Spot, Review, Booking, Image } = require('../../db/models');
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { validateSpot, validateReview, validateEndDate, validateQueryParameters } = require('../../utils/validation_req_body.js');
const router = express.Router();

// Add an Image to a Review based on the Review's id
router.post('/:id/images', [restoreUser, requireAuthentication, requireAuthorizationReview], async (req, res, next) => {
    const user = req.user;
    const { id } = req.params;
    const { url } = req.body;

    const review = await Review.findByPk(id);

    const imagesInReview = await review.getImages();

    if(imagesInReview.length <= 10) {
        const newImage = await review.createImage({
            userId: user.id,
            url
        })
    
        const image = await Image.findByPk(newImage.id, {
            // attributes: ['id', 'imageableId', 'imageableType', 'url']
            attributes: ['id', 'imageableId', 'url']
        })
    
        res.json(image)
     } else {
        const err = new Error("Maximum number of images for this resource was reached");
        err.status = 403;
        return next(err);
     }
});


// Edit a Review
router.put('/:id', [restoreUser, requireAuthentication, requireAuthorizationReview, validateReview], async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    const { review, stars } = req.body;

    const reviewDetails = await Review.findByPk(id);

    // console.log(reviewDetails);

    await reviewDetails.update({
        review: review,
        stars: stars
    });

    res.json(reviewDetails);
});


// Delete an existing review
router.delete('/:id', [restoreUser, requireAuthentication, requireAuthorizationReview], async (req, res) => {
    const user = req.user;
    const { id } = req.params;

    const review = await Review.findByPk(id);
    await review.destroy();

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
});



module.exports = router;