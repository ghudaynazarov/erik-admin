const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Room = sequelize.define('room', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    lang: {type: Sequelize.STRING, allowNull:false},
    title:{ type: Sequelize.STRING,allowNull:false },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    bedNum:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    guestNum: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = Room;