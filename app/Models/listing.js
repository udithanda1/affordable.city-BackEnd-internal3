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
        numberOfBedrooms: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        numberOfBathrooms: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE
    };

    const modelOptions = {};

    const ListingModel = sequelize.define('listing', modelDefinition);
    return ListingModel;
};