"use strict";

const bcrypt = require("bcrypt");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            this.hasMany(models.Order, { foreignKey: "userId", as: "orders" });
        }
    }
    User.init(
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            image: DataTypes.STRING,
            isAdmin: DataTypes.BOOLEAN,
            
            role: {
                type: DataTypes.STRING,
                defaultValue: "USER",
            },
        },
        {
            sequelize,
            modelName: "User",
            hooks: {
                beforeCreate: (user) => {
                    const salt = bcrypt.genSaltSync(10);
                    user.password = bcrypt.hashSync(user.password, salt);
                },
            },
            defaultScope: {
                attributes: { exclude: ["password"] },
            },
            scopes: {
                withPassword: {
                    attributes: {},
                },
            },
        }
    );

    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    return User;
};
