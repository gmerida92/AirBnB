'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 2,
        startDate:"2022-08-22",
        endDate:"2022-08-30"
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
        startDate:"2023-03-11",
        endDate:"2023-03-16"
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
        startDate:"2022-08-01",
        endDate:"2022-08-20"
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
        startDate:"2022-09-10",
        endDate:"2022-09-21"
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
    options.tableName = 'Bookings'
    return queryInterface.bulkDelete(options, null, {});
  }
};
