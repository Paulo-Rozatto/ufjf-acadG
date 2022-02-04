const { username, password } = require('./dbCredentials.js')

module.exports = {
  "development": {
    "username": username,
    "password": password,
    "database": "acadgDB",
    "host": "localhost",
    "dialect": "postgres",
    "define": {
      timestamps: false,
      underscored: true,
    },
  },
}
