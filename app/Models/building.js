const config = require('../config');

module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
    zip_code: {
      type: DataTypes.STRING,

      allowNull: false
    },
    units: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
    underscored: true,
    classMethods: {
      associate(models) {
        BuildingModel.hasMany(models.ListingModel);
      }
    }
  };

  const BuildingModel = sequelize.define('building', modelDefinition, modelOptions);
  BuildingModel.associate = (models) => {
    BuildingModel.hasMany(models.listing, { onDelete: 'CASCADE' });
  };

  return BuildingModel;
};
