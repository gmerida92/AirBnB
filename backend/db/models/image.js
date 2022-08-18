'use strict';
// Helper function
const uppercaseFirst = str => `${str[0].toUpperCase()}${str.slice(1)}`;

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    getImageable(options) {
      if (!this.imageableType) return Promise.resolve(null);
      const mixinMethodName = `get${uppercaseFirst(this.imageableType)}`;
      return this[mixinMethodName](options);
    }

    static associate(models) {
      Image.belongsTo(
        models.User,
        {
          foreignKey: 'userId'
        }
      );

      Image.belongsTo(
        models.User,
        {
          foreignKey: 'imageableId',
          constraints: false
        }
      );

      Image.belongsTo(
        models.Spot,
        {
          foreignKey: 'imageableId',
          constraints: false
        }
      );

      Image.belongsTo(
        models.Review,
        {
          foreignKey: 'imageableId',
          constraints: false
        }
      );
    }
  }
  Image.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageableId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageableType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};