const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const port = 3000
const app = express();


app.use(cors());
app.use(express.json());
app.use(routes);

const db = require('./models');

// testa conexao com o banco e roda aplicacao na porta selecionada
(async function () {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');

        app.listen(port, () => {
            console.log(`AcadG API listening on port ${port}`)
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
