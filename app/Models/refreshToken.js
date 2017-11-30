const config = require('../config');

module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },

    refresh_token: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valid: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
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

  const RefreshTokenModel = sequelize.define('refresh_tokens', modelDefinition, modelOptions);
  return RefreshTokenModel;
};
