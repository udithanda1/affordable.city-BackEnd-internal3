const config = require('../config');

module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    contentSize: {
      type: DataTypes.STRING,
      allowNull: true
    },
    original_file_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    content_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fileFormat: {
      type: DataTypes.STRING,
      allowNull: true
    },
    linkedObject: {
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

  const ListingPhotosModel = sequelize.define('listingPhotos', modelDefinition, modelOptions);
  return ListingPhotosModel;
};
