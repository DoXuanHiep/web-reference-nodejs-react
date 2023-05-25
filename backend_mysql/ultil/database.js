const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('messages', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize