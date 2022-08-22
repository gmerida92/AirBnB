// backend/routes/api/users.js
const express = require('express');
const { setTokenCookie, restoreUser, requireAuthentication } = require('../../utils/auth.js');
const { User, Spot, Review, Booking, Image, sequelize, } = require('../../db/models');
const { validateLogin, validateSignup } = require('../../utils/validation_req_body.js');
const router = express.Router();


//SESSION ROUTES

// Get Current User
router.get('/myaccount', [restoreUser, requireAuthentication], async (req, res) => {
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

//Get all Spots owned by the Current User
router.get("/myaccount/spots", [restoreUser, requireAuthentication], async (req, res) => {
    const user = req.user; // id = 1

    // const reviews = await Review.findAll({
    // })

    // const spots = await Spot.findAll({
    //     where: { ownerId: user.id }, // user.id = 1

    // include: [{
    //     model: Review, 
    //     attributes: [
    //         [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
    //     ]

    // }]


    // attributes: {
    //     include: Review
    // }


    // include: {
    //     model: Review,
    //     attributes: [],
    // },
    // attributes: {
    //     // [
    //     //     sequelize.fn("AVG", sequelize.col("Reviews.stars")), 'avgRating'
    //     // ]
    //     include: [
    //         [
    //             sequelize.fn("AVG", sequelize.col("Reviews.stars")), 'avgRating'
    //         ]
    //     ]
    // }


    // })

    // const spots = await Spot.findAll({
    //     attributes: [
    //         'id',
    //         'ownerId',
    //         'address',
    //         "city",
    //         "state",
    //         "country",
    //         "lat",
    //         "lng",
    //         "name",
    //         "price",
    //         "description",
    //         "createdAt",
    //         "updatedAt",
    //         [sequelize.fn("AVG",sequelize.col('Reviews.star')), 'avgRating'],
    //         'previewImage'
    //     ],
    //     where: { ownerId: user.id },
    // });

    // const spotsObject = {

    // };



    // console.log(spots)

    const spots = await Spot.findAll({
        where: { ownerId: user.id }
    });

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
    });
});


// Get all Reviews of the Current User
router.get('/myaccount/reviews', [restoreUser, requireAuthentication], async (req, res) => {
    const user = req.user;

    const reviews = await Review.findAll({
        where: { userId: user.id },
        include: [
            {
                model: User,
                attributes: { exclude: ['email', 'username', 'password', 'createdAt', 'updatedAt'] }
            },
            {
                model: Spot,
                attributes: { exclude: ['previewImage', 'description', 'createdAt', 'updatedAt'] }
            },
            {
                model: Image,
                attributes: {exclude:['userId', 'imageableType', 'createdAt', 'updatedAt']}
            }
        ]
    });

    // try {
    //     const images = await Image.findAll({
    //         where: {userId: user.id}
    //     })
    // }
    // catch (e) {
    //     console.log(user.id)
    //     console.log(e)
    // }

    res.json({
        Reviews: reviews
    })
});


// Get all of the Current User's Bookings


// // TODO: Returns all the reviews written by the current user
// // returns all the reviews written by the current user
// router.get('/reviews', [restoreUser, requireAuth], async (req, res, next) => {
//     // get review of given user id
//     const reviews = await Review.findAll({
//       where: {
//         userId: req.user.id
//       },
//       include: [
//         {
//           model: User
//         },
//         {
//           model: Spot.scope('byReviews'),
//         }
//       ]
//     });

//     // get array of images for current review 
//     // reviews.map(async review => {
//     for (const review of reviews) {
//       // for all images per review
//       const images = await Image.findAll({ where: { imageableId: review.id } });

//       // put it into review images to be placed in reviews
//       const reviewImages = [];

//       // for each image in found images
//       images.map(image => {
//         // push all its attribute into here
//         const currentImage = {
//           ...image.dataValues
//         };
//         reviewImages.push(currentImage);
//       });

//       review.dataValues['Images'] = reviewImages;
//     }

//     // return successful response 
//     res.json({
//       Reviews: reviews
//     });

//   });


// Get all of the Current User's Bookings
router.get('/myaccount/bookings', [restoreUser, requireAuthentication], async (req, res) => {
    const user = req.user;

    const bookings = await Booking.findAll({
        where: {userId: user.id},
        include:[
            {
                model: Spot,
                attributes: {exclude: ['description', 'createdAt', "updatedAt"]}
            }
        ],
        // attributes: [
        //     'userId',
        //     'startDate',
        //     'endDate',
        //     'createdAt',
        //     'updatedAt'
        // ],
        // order: [
        //     [{model: Spot, as: 'Spot'}]
        // ]
    })

    console.log(bookings)

    res.json({
        Bookings: bookings
    });
});

module.exports = router;