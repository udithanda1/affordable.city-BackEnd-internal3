const config = require('../config');

module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    rent: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    units: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    no_of_bedrooms: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    no_of_bathrooms: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    neighbourhood: {
      type: DataTypes.STRING,
      allowNull: true
    },
    video: {
      type: DataTypes.STRING,
      allowNull: true
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

  const ListingModel = sequelize.define('listing', modelDefinition, modelOptions);
  ListingModel.associate = (models) => {
    ListingModel.hasMany(models.listingPhotos, { onDelete: 'CASCADE' });
    ListingModel.hasMany(models.listingDocuments, { onDelete: 'CASCADE' });
    ListingModel.hasMany(models.listingDescriptor, { onDelete: 'CASCADE' });
    ListingModel.hasMany(models.listingAmenitie, { onDelete: 'CASCADE' });
  };
  return ListingModel;
};
