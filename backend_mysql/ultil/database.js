const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('messages', 'root', 'admin', {
    host: 'db',
    dialect: 'mysql',
});

module.exports = sequelize