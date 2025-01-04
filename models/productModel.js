const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Product = sequelize.define('product', {
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
    option:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = Product;