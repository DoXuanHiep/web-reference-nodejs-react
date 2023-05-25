const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('messages', 'root', 'admin', {
    host: 'db', //db is ip of ..
    dialect: 'mysql',
});

module.exports = sequelize