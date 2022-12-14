'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.hasMany(
        models.Image,
        {
          foreignKey: 'imageableId',
          constraints: false,
          scope: {
            imageableType: 'Spot'
          },
          onDelete: 'CASCADE',
          hooks: true
        }
      );

      Spot.hasMany(
        models.Review,
        {
          foreignKey: 'spotId',
          onDelete: 'CASCADE',
          hooks: true
        }
      );

      Spot.hasMany(
        models.Booking,
        {
          foreignKey: 'spotId',
          onDelete: 'CASCADE',
          hooks: true
        }
      );

      Spot.belongsTo(
        models.User,
        {
          foreignKey: 'ownerId', as: 'Owner'
        }
      )
    }
  }

  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   len: [1, 50]
      // }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    previewImage: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Spot',
    // defaultScope: {
    //   attributes: {
    //     exclude: ["previewImage"]
    //   }
    // }
  });
  return Spot;
};