const express = require('express');
const models = require('./models');

const routes = express.Router();

routes.get('/users', async (req, res) => {
    try {
        const users = await models.User.findAll({
            attributes: { exclude: ['password'] }
        });

        res.status(400).json(users);
    } catch (e) {
        console.error(e);
        res.status(500).json({error: "error"});
    }

});

module.exports = routes;