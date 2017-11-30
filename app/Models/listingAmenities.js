const config = require('../config');

module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE

  };

  const modelOptions = {
    underscored: true
  };

  const ListingAmenitiesModel = sequelize.define('listingAmenitie', modelDefinition, modelOptions);
  return ListingAmenitiesModel;
};
