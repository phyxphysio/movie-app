const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database').sequelize;
const bcrypt = require('bcrypt');



const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }}, { timestamps: false });


User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
});


User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}


module.exports = User;
