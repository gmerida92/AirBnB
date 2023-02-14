'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: "George",
        lastName: "Merida",
        email: "gmerida@gmail.com",
        username: "gmerida",
        password: bcrypt.hashSync("password")
      },
      {
        firstName: "Ashli",
        lastName: "Santos",
        email: "asantos@gmail.com",
        username: "asantos",
        password: bcrypt.hashSync("password2")
      },
      {
        firstName: "Peter",
        lastName: "Parker",
        email: "pbparker@gmail.com",
        username: "spiderman",
        password: bcrypt.hashSync("password3")
      },
      {
        firstName: "Kanye",
        lastName: "West",
        email: "kwest@gmail.com",
        username: "yeezy",
        password: bcrypt.hashSync("password4")
      },
      {
        firstName: "John",
        lastName: "Doe",
        email: "demo@user.io",
        username: "demo-lition",
        password: bcrypt.hashSync("password5")
      },
      {
        firstName: "Yooser",
        lastName: "One",
        email: "user1@user.io",
        username: "fakeUser1",
        password: bcrypt.hashSync("password6")
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Gmerida', 'Asantos', 'Spiderman', 'Yeezy', 'Demo-lition', 'FakeUser1'] }
    }, {});
  }
};
