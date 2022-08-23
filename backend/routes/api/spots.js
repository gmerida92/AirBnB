// backend/routes/api/users.js
const express = require('express');
const { setTokenCookie, restoreUser, requireAuthentication, requireAuthorizationSpot, requireAuthorizationBooking } = require('../../utils/auth.js');
const { User, Spot, Review, Booking, Image } = require('../../db/models');
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { validateSpot, validateReview, validateEndDate, validateQueryParameters } = require('../../utils/validation_req_body.js');
const { checkSpot } = require('../../utils/validation_db');
const router = express.Router();

// SPOT ROUTES

// Get all Spots
router.get('/', [validateQueryParameters], async (req, res) => {
    const user = req.user
    let { page, size } = req.query;
    let { minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    parseInt(page, 10);
    parseInt(size, 10);
    minLat = parseFloat(minLat);
    maxLat = parseFloat(maxLat);
    minLng = parseFloat(minLng);
    maxLng = parseFloat(maxLng);
    minPrice = parseFloat(minPrice);
    maxPrice = parseFloat(maxPrice);

    if (!page || Number.isNaN(page) || page > 10 || page < 0) page = 0
    if (!size || Number.isNaN(size) || size > 20 || size < 0) size = 20


    const where = {};
    const limit = size;
    const offset = page <= 0 ? 0 : size * (page - 1);

    if (minLat) { where.lat = { [Op.gte]: minLat } };
    if (maxLat) { where.lat = { [Op.lte]: maxLat } };
    if (minLat && maxLat) { where.lat = { [Op.between]: [minLat, maxLat] } }

    if (minLng) { where.lng = { [Op.gte]: minLng } };
    if (maxLng) { where.lng = { [Op.lte]: maxLng } };
    if (minLng && maxLng) { where.lng = { [Op.between]: [minLng, maxLng] } }

    console.log(maxPrice, "here");
    if (minPrice || minPrice === 0) { where.price = { [Op.gte]: minPrice } };
    if (maxPrice || maxPrice === 0) { where.price = { [Op.lte]: maxPrice } };
    if (minPrice && maxPrice) { where.price = { [Op.between]: [minPrice, maxPrice] } }


    if (Object.keys(where).length > 0) {
        const spots = await Spot.findAll({
            where,
            limit: limit,
            offset: offset
        });

        res.json({
            Spots: spots,
            page: page,
            size: size
        })
    }
    else {
        const spots = await Spot.findAll();

        for (i = 0; i < spots.length; i++) {
            const countReviews = await Review.count({
                where: { spotId: spots[i].dataValues.id }
            })
            const sumStars = await Review.sum("stars", {
                where: { spotId: spots[i].dataValues.id }
            });
            const avgStarRating = sumStars / countReviews;
            spots[i].dataValues.avgRating = avgStarRating;
        };

        res.json({
            Spots: spots
        })
    }
});


// Get details of a Spot from an id
router.get('/:id', async (req, res, next) => {
    let { id } = req.params;
    id = Number(id);

    const spot = await Spot.findByPk(id,
        {
            attributes: ['id','ownerId', 'address', 'city','state','country', 'lat', 'lng', 'name', 'description','price', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: Image,
                    attributes: { exclude: ['userId', 'imageableType', 'createdAt', 'updatedAt'] }
                },
                {
                    model: User,
                    as: 'Owner',
                    attributes: { exclude: ['password', 'username', 'createdAt', 'updatedAt'] }
                },
            ]
        }
    )

    if (!spot) {
        const err = new Error("Spot not found");
        err.message = "Spot couldn't be found";
        err.status = 404;
        next(err)
    }

    const countReviews = await Review.count({
        where: { spotId: spot.dataValues.id }
    })

    const sumStars = await Review.sum("stars", {
        where: { spotId: spot.dataValues.id }
    });

    const avgStarRating = sumStars / countReviews;
    spot.dataValues.numReviews = countReviews;
    spot.dataValues.avgRating = avgStarRating;

    res.json(spot);
});


// Create a Spot
router.post('/', [restoreUser, requireAuthentication, validateSpot], async (req, res) => {
    const user = req.user
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await Spot.create({
        ownerId: user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
    })

    res.status(201)
    res.json(newSpot)

});


//Add an Image to a spot base on the Spot's id
router.post('/:id/images', [restoreUser, requireAuthentication, requireAuthorizationSpot], async (req, res, next) => {
    const user = req.user
    const { id } = req.params;
    const { url } = req.body;

    const spot = await Spot.findByPk(id);

    const newImage = await spot.createImage({
        userId: user.id,
        url
    })

    const image = await Image.findByPk(newImage.id, {
        attributes: ['id', 'imageableId', 'url']
    })

    res.json(image);
});


//Edit a Spot
router.put('/:id', [restoreUser, requireAuthentication, requireAuthorizationSpot, validateSpot], async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.findByPk(id, {
        attributes: { exclude: ['previewImage'] }
    });

    spot.update({
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price,
    })

    res.json(spot);

});


//Delete a Spot
router.delete('/:id', [restoreUser, requireAuthentication, requireAuthorizationSpot], async (req, res) => {
    const { id } = req.params;
    const user = req.user;

    const spot = await Spot.findByPk(id);
    await spot.destroy();

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
});


//Get all Reviews by a Spot's id
router.get('/:id/reviews', async (req, res, next) => {
    const user = req.user;
    const { id } = req.params;

    const spot = await Spot.findByPk(id);

    if (!spot) {
        const err = new Error("Spot not found");
        err.message = "Spot couldn't be found";
        err.status = 404;
        return next(err)
    }

    const reviews = await spot.getReviews({
        include: [
            {
                model: User,
                attributes: { exclude: ['email', 'password', 'username', 'createdAt', 'updatedAt'] }
            },
            {
                model: Image,
                attributes: { exclude: ['userId', 'imageableType', 'createdAt', 'updatedAt'] }
            },
        ]
    });

    res.json({
        Reviews: reviews
    })
});


// Create a Review for a Spot based on the Spot's id
router.post('/:id/reviews', [restoreUser, requireAuthentication, validateReview], async (req, res, next) => {
    const user = req.user;
    const { id } = req.params;
    const { review, stars } = req.body;

    const spot = await Spot.findByPk(id);

    if (!spot) {
        const err = new Error("Spot not found");
        err.message = "Spot couldn't be found";
        err.status = 404;
        return next(err)
    }

    const checkReview = await Review.findOne({
        where: { userId: user.id, spotId: id },
    });

    if (checkReview) {
        const err = new Error("User already has a review for this spot");
        err.message = "User already has a review for this spot";
        err.status = 404;
        return next(err)
    }

    const newReview = await spot.createReview({
        userId: user.id,
        review: review,
        stars: stars
    });


    res.status(201);
    res.json(newReview);

});


// Get all Bookings for a Spot based on the Spot's id
router.get('/:id/bookings', [restoreUser, requireAuthentication], async (req, res, next) => {
    const user = req.user;
    const { id } = req.params;

    const spot = await Spot.findByPk(id);

    if (!spot) {
        const err = new Error("Spot not found");
        err.message = "Spot couldn't be found";
        err.status = 404;
        return next(err)
    }

    if (spot.ownerId === user.id) {
        const bookings = await spot.getBookings({
            include: [{
                model: User,
                attributes: { exclude: ['email', 'password', 'username', 'createdAt', 'updatedAt'] }
            }],
        });

        res.json({
            Bookings: bookings
        });
    } else {
        const bookings = await spot.getBookings({
            attributes: ['spotId', 'startDate', 'endDate']
        });

        res.json({
            Bookings: bookings
        });
    }
});


// Create a Booking from a Spot based on the Spot's Id
router.post('/:id/bookings', [restoreUser, requireAuthentication, requireAuthorizationBooking, validateEndDate], async (req, res, next) => {
    const user = req.user;
    const { id } = req.params;
    const { startDate, endDate } = req.body;

    const spot = await Spot.findByPk(id);

    const allSpotsBookings = await Booking.findAll({
        where: { spotId: id }
    });

    const err = new Error("Sorry, this spot is already booked for the specified dates");
    err.status = 403;
    err.errors = {};

    let newStartDate = new Date(startDate);
    let newEndDate = new Date(endDate);


    for (let i = 0; i < allSpotsBookings.length; i++) {
        let bookedStartDate = new Date(allSpotsBookings[i].startDate);
        let bookedEndDate = new Date(allSpotsBookings[i].endDate);

        if (allSpotsBookings) {
            if (newStartDate.getTime() >= bookedStartDate.getTime() && newStartDate.getTime() <= bookedEndDate.getTime()) {
                err.errors['startDate'] = "Start date conflicts with an existing booking"
            }
            if (newEndDate.getTime() >= bookedStartDate.getTime() && newEndDate.getTime() <= bookedEndDate.getTime()) {
                err.errors['endDate'] = "End date conflicts with an existing booking"
            }
            if (newStartDate.getTime() <= bookedStartDate.getTime() && newEndDate.getTime() >= bookedEndDate.getTime()) {
                err.errors['startDate'] = "Start date conflicts with an existing booking"
                err.errors['endDate'] = "End date conflicts with an existing booking"
            }
            if (Object.keys(err.errors).length > 0) {
                return next(err)
            }
        }
    }

    const newBooking = await spot.createBooking({
        userId: user.id,
        startDate,
        endDate
    })

    res.json(newBooking);
});



module.exports = router;