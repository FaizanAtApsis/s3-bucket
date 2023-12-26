'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bucket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({File}) {
      // define association here
      this.hasMany(File,{
        foreignKey:'bucket_id',
      })

      File.belongsTo(this,{
        foreignKey:'bucket_id'
      })
      
    }
  }
  Bucket.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      unique: {
        args: true,
        msg: "Bucket already in use!",
      },
    },
    user_id: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Bucket',
    tableName: 'buckets'
  });
  return Bucket;
};