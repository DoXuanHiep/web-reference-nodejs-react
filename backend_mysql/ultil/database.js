const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('messages', 'root', 'hiep123', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize