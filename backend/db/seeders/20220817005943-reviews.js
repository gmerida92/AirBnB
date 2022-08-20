'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reviews', [
      {
        userId: 2,
        spotId: 1,
        reviews: "Place was just what we needed!",
        stars: 3
      },
      {
        userId: 1,
        spotId: 3,
        reviews: "Place was fun. Would come back!",
        stars: 4
      },
      {
        userId: 2,
        spotId: 4,
        reviews: "The worst. Host canceled our reservation at the last minute.",
        stars: 1
      },
      {
        userId: 3,
        spotId: 5,
        reviews: "Place is pretty mid.",
        stars: 3
      },
      {
        userId: 4,
        spotId: 6,
        reviews: "Amazing location. Host was very attentive! Will come back again!",
        stars: 5
      },
      {
        userId: 5,
        spotId: 7,
        reviews: "Above average service and location is very clean.",
        stars: 4
      },
      {
        userId: 6,
        spotId: 8,
        reviews: "Nothing special, but very clean.",
        stars: 3
      },
      {
        userId: 1,
        spotId: 2,
        reviews: "Amazing and perfect place for a getaway!",
        stars: 5
      },
      {
        userId: 2,
        spotId: 3,
        reviews: "I've been to a better location for cheaper.",
        stars: 2
      },
      {
        userId: 3,
        spotId: 4,
        reviews: "Place was a mess, but environment was pretty.",
        stars: 2
      },
      {
        userId: 5,
        spotId: 4,
        reviews: "I had to cancel, and could not get a refund.",
        stars: 1
      },
      {
        userId: 6,
        spotId: 4,
        reviews: "Felt like I stepped into the old west. Charming but could be better.",
        stars: 3
      },
      {
        userId: 1,
        spotId: 4,
        reviews: "Too expensive and not very clean. Scenic views.",
        stars: 2
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
