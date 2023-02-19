'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews';  
    return queryInterface.bulkInsert(options, [
      {
        userId: 2,
        spotId: 1,
        review: "Place was just what we needed!",
        stars: 3
      },
      {
        userId: 1,
        spotId: 3,
        review: "Place was fun. Would come back!",
        stars: 4
      },
      {
        userId: 2,
        spotId: 4,
        review: "The worst. Host canceled our reservation at the last minute.",
        stars: 1
      },
      {
        userId: 3,
        spotId: 5,
        review: "Place is pretty mid.",
        stars: 3
      },
      {
        userId: 4,
        spotId: 6,
        review: "Amazing location. Host was very attentive! Will come back again!",
        stars: 5
      },
      {
        userId: 5,
        spotId: 7,
        review: "Above average service and location is very clean.",
        stars: 4
      },
      {
        userId: 6,
        spotId: 8,
        review: "Nothing special, but very clean.",
        stars: 3
      },
      {
        userId: 1,
        spotId: 2,
        review: "Amazing and perfect place for a getaway!",
        stars: 5
      },
      {
        userId: 2,
        spotId: 3,
        review: "I've been to a better location for cheaper.",
        stars: 2
      },
      {
        userId: 3,
        spotId: 4,
        review: "Place was a mess, but environment was pretty.",
        stars: 2
      },
      {
        userId: 5,
        spotId: 4,
        review: "I had to cancel, and could not get a refund.",
        stars: 1
      },
      {
        userId: 6,
        spotId: 4,
        review: "Felt like I stepped into the old west. Charming but could be better.",
        stars: 3
      },
      {
        userId: 1,
        spotId: 4,
        review: "Too expensive and not very clean. Scenic views.",
        stars: 2
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';  
    return queryInterface.bulkDelete(options, null, {});
  }
};
