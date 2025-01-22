const sequelize = require("../util/db");

const Sequelize = require("sequelize");

const Reservation = sequelize.define("reservation", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
},
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  message: Sequelize.STRING,
  history: {type: Sequelize.BOOLEAN, defaultValue: false},
  status: {type: Sequelize.STRING}
});

module.exports = Reservation;
