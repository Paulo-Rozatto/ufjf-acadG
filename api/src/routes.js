const express = require('express');
const models = require('./models');
const adminCred = require('./config/adminCredentials')

const routes = express.Router();

routes.get('/users', async (req, res) => {
    try {
        const users = await models.User.findAll({
            attributes: { exclude: ['password'] }
        });

        res.status(400).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "error" });
    }

});

routes.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;

        if (login ===  adminCred.user && password === adminCred.password) {
            res.status(400).send({
                success: true,
                msg: 'Successful login',
                isAdmin: true
            })
        }

        const user = (await models.User.findAll({
            attributes: { exclude: ['password'] },
            where: { login, password }
        }))[0];

        if (!user) {
            res.status(401).json({
                success: false,
                msg: 'Invalid credentials'
            })
        }

        let type = {};
        if (user.type === 1) {
            type = (await models.Member.findAll({
                where: { user_id: user.id }
            }))[0]
        }

        res.status(400).json({
            success: true,
            msg: 'Successful login',
            user: { ...user.dataValues, ...type.dataValues },
            isAdmin: false
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "error" });
    }
})

module.exports = routes;