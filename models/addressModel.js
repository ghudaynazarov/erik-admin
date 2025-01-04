const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Address = sequelize.define('address', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    lang: {type: Sequelize.STRING, allowNull:false},
    address:{ type: Sequelize.STRING,allowNull:false },
    phone_number: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = Address;