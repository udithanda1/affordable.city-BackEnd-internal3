const config = require('../config');

module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    amenitie_name: {
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

  const AmenitiesModel = sequelize.define('amenitie', modelDefinition, modelOptions);
  AmenitiesModel.associate = (models) => {
    AmenitiesModel.hasMany(models.listingAmenitie, { onDelete: 'CASCADE' });
  };
  return AmenitiesModel;
};
