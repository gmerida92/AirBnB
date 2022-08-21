// backend/routes/api/users.js
const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User, Spot, Review, Booking, Image, sequelize, } = require('../../db/models');
const router = express.Router();

// SPOTS ROUTES

// Get all Spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll();

    for (i = 0; i < spots.length; i++) {

        const numReviews = await Review.count({
            where: { spotId: spots[i].dataValues.id }
        })

        const sumStars = await Review.sum("stars", {
            where: { spotId: spots[i].dataValues.id }
        });

        const avgStarRating = sumStars / numReviews;
        spots[i].dataValues.avgRating = avgStarRating;
    };

    res.json({
        Spots: spots
    })
});


// Get details of a Spot from an id
router.get('/:id', async (req, res) => {
    let { id } = req.params;
    id = Number(id);
    console.log(id)
    // const spot = await Spot.findByPk(id);

    const spot = await Spot.findByPk(id,
        {
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

    console.log(spot)

    // try {
    //     const spot = await Spot.findByPk(id,
    //     //      {
    //     //     include: [
    //     //         {
    //     //             model: Image,
    //     //             attributes: { exclude: ['userId', 'imageableType', 'createdAt', 'updatedAt'] }
    //     //         },
    //     //         {
    //     //             model: User,
    //     //             as: 'Owner',
    //     //             attributes: { include: ['id', 'firstName', 'lastName'] }
    //     //         },
    //     //     ]
    //     // }
    //     )
    // }
    // catch (e) {
    //     console.log(e)
    // }

    const numReviews = await Review.count({
        where: { spotId: spot.dataValues.id }
    })

    const sumStars = await Review.sum("stars", {
        where: { spotId: spot.dataValues.id }
    });

    const avgStarRating = sumStars / numReviews;
    spot.dataValues.numReviews = numReviews;
    spot.dataValues.avgRating = avgStarRating;

    // for (i = 0; i < spot.length; i++) {

    //     const numReviews = await Review.count({
    //         where: { spotId: spot[i].dataValues.id }
    //     })

    //     const sumStars = await Review.sum("stars", {
    //         where: { spotId: spot[i].dataValues.id }
    //     });

    //     const avgStarRating = sumStars / numReviews;
    //     spot[i].dataValues.avgRating = avgStarRating;
    // };

    res.json(spot);
});


module.exports = router;