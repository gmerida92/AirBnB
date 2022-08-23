'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
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
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Gmerida', 'Asantos', 'Spiderman', 'Yeezy', 'Demo-lition', 'FakeUser1'] }
    }, {});
  }
};
