require('dotenv').config();
const { Sequelize } = require('sequelize');

// Create a Sequelize instance for PostgreSQL
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'P@ssw0rd',
  database: process.env.DB_DATABASE || 'admin',
  logging: false,
});

module.exports = sequelize;
