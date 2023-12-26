'use strict';
const {
  Model
} = require('sequelize');
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Bucket}) {
      // define association here
      this.hasMany(Bucket,{
        foreignKey:'user_id',
      })

      Bucket.belongsTo(this,{
        foreignKey:'user_id'
      })
    }
  }
  User.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique: {
        args: true,
        msg: "Email address already in use!",
      },
      validate: {
        isEmail: {
          msg: "Please enter a valid email!",
        },
        notEmpty: { msg: "email must not be empty" },
        notNull: {
          msg: "Email cannot be empty!",
        },
        len: {
          args: [0, 200],
          msg: "Email must be less than or equal to 50",
        },
      },
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });

  User.prototype.getSignedJwtToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
  };

  return User;
};