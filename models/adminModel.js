const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Admin = sequelize.define('admin', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email:{ type: Sequelize.STRING,allowNull:false },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    resetToken: Sequelize.STRING,
    resetTokenExpiration: Sequelize.DATE
});

module.exports = Admin;