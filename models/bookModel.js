const sequelize = require("../util/db");

const Sequelize = require("sequelize");

const Book = sequelize.define("book", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
},
  checkIn: Sequelize.DATEONLY,
  checkOut: Sequelize.DATEONLY,
  guests: Sequelize.STRING, 
  room: Sequelize.INTEGER,
  phonenumber: Sequelize.STRING,
  history: {type: Sequelize.BOOLEAN, defaultValue: false},
  status: {type: Sequelize.STRING}
});

module.exports = Book;
