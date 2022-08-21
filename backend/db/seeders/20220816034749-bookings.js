'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 2,
        startDate:"2023-01-01",
        endDate:"2023-01-07"
      },
      {
        spotId: 2,
        userId: 3,
        startDate:"2023-01-10",
        endDate:"2023-01-16"
      },
      {
        spotId: 3,
        userId: 4,
        startDate:"2023-02-11",
        endDate:"2023-02-17"
      },
      {
        spotId: 4,
        userId: 5,
        startDate:"2023-03-11 04:25:37",
        endDate:"2023-03-16 04:25:37"
      },
      {
        spotId: 5,
        userId: 6,
        startDate:"2023-02-01",
        endDate:"2023-02-07"
      },
      {
        spotId: 6,
        userId: 1,
        startDate:"2023-04-07",
        endDate:"2023-04-28"
      },
      {
        spotId: 7,
        userId: 2,
        startDate:"2023-04-12",
        endDate:"2023-04-15"
      },
      {
        spotId: 8,
        userId: 3,
        startDate:"2023-05-26",
        endDate:"2023-05-30"
      },
      {
        spotId: 1,
        userId: 4,
        startDate:"2023-02-10",
        endDate:"2023-02-21"
      },
      {
        spotId: 2,
        userId: 5,
        startDate:"2023-08-02",
        endDate:"2023-08-15"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Bookings', null, {});
  }
};
