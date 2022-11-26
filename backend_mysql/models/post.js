const Sequelize = require('sequelize')

const sequelize = require('../ultil/database')

const Post = sequelize.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users', // 'fathers' refers to table name
            key: 'id', // 'id' refers to column name in fathers table
        },
        allowNull: false
    }
}
)

module.exports = Post