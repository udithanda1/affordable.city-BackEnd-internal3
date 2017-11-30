const config = require('../config');

module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    document: {
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

  const ListingDocumentsModel = sequelize.define('listingDocuments', modelDefinition, modelOptions);
  return ListingDocumentsModel;
};
