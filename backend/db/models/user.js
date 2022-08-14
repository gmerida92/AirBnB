'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {

  class User extends Model {

    toSafeObject() {
      const { id, firstName, lastName, email, username } = this; // context will be the User Instance
      return { id, firstName, lastName, email, username }; ///Will potentially change for project-20220811
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.password.toString());
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    // Login method
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          email: credential // Changed to this on 20220813
          // [Op.or]: {
          //   username: credential,
          //   email: credential
          // } ///Will potentially change for project-20220811
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    // Sign up method
    static async signup({ firstName, lastName, email, username, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id) ///Will potentially change for project-20220811
    }

    static associate(models) {
      // define association here
    }
  }

  User.init({

    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: [ "createdAt", "updatedAt"]
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: [ "createdAt", "updatedAt"] }
      },
      loginUser: {
        attributes: { exclude: ["createdAt", "updatedAt"] }
      }
    }
  });

  return User;
};