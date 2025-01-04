const sequelize = require("../util/db");

const Sequelize = require("sequelize");

const Review = sequelize.define("review", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
},
  name: Sequelize.STRING,
  message: Sequelize.STRING
});

module.exports = Review;
