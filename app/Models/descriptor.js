const config = require('../config');

module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    descriptor_title: {
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

  const DescriptorModel = sequelize.define('descriptor', modelDefinition, modelOptions);

  DescriptorModel.associate = (models) => {
    DescriptorModel.hasMany(models.listingDescriptor, { onDelete: 'CASCADE' });
  };
  return DescriptorModel;
};
