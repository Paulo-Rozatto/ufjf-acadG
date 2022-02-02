const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const port = 3000
const app = express();


app.use(cors());
app.use(express.json());
app.use(routes);

const sequelize = require('./connection.js');

(async function testConnecion() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        app.listen(port, () => {
            console.log(`AcadG API listening on port ${port}`)
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
