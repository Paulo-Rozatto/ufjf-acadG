const Sequelize = require('sequelize');
const dbCredentials = require('./config/dbCredentials.js')

const connection = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: dbCredentials.username,
    password: dbCredentials.password,
    database: 'acadgDB',
    define: {
        timestamps: false,
        underscored: true,
    },
    'models-path': './models/',
});

module.exports = connection;