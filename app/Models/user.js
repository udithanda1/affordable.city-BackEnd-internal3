const config = require('../config');
const bcrypt = require('bcrypt');
// Compares two passwords.
async function comparePasswords(password, pwd) {
    return await bcrypt.compare(password, pwd);
}
// Hashes the password for a user object.
function hashPassword(user) {
    if (user.changed('password')) {
        return bcrypt.hash(user.password, 10).then(function(password) {
            user.password = password;
        });
    }
}
module.exports = (sequelize, DataTypes) => {
    const modelDefinition = {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Oops. Looks like you already have an account with this email address. Please try to login.',
                fields: [sequelize.fn('lower', sequelize.col('email_id'))]
            },
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Email address must be valid'
                }
            }
        },
        phone_number: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: config.userRoles.user
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
    };

    const modelOptions = {
        hooks: {
            beforeValidate: hashPassword
        },
        underscored: true
    };

    const UserModel = sequelize.define('user', modelDefinition, modelOptions);

    UserModel.associate = (models) => {
        UserModel.hasMany(models.building, { onDelete: 'CASCADE' });
    };
    // Adding an instance level method
    UserModel.prototype.comparePasswords = function(password) {
        return comparePasswords(password, this.password);
    };
    return UserModel;
};