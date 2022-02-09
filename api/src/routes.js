const express = require('express');
const models = require('./models');
const adminCred = require('./config/adminCredentials');
const e = require('express');

const routes = express.Router();

routes.get('/users', async (req, res) => {
    try {
        const users = await models.User.findAll({
            attributes: { exclude: ['password'] }
        });

        return res.status(400).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "error" });
    }

});

routes.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;

        if (login === adminCred.user && password === adminCred.password) {
            return res.status(400).send({
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
            return res.status(401).json({
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

        return res.status(400).json({
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

async function createUser(userData) {
    try {
        let user = await models.User.create(userData);

        return user;

    } catch (error) {
        return { id: -1, error };
    }

}

routes.post('/employee', async (req, res) => {
    const { authentication, userData, employeeData, instructorData } = req.body;

    if (authentication.username != adminCred.username || authentication.password != adminCred.password) {
        return res.status(401).json({
            success: false,
            msg: 'Invalid credentials'
        })
    }

    try {
        let user = await createUser(userData);

        if (user.id == -1) {
            console.error(user.error)
            res.status(500).json({ error: "error" });
        }

        let employee = await models.Employee.create({
            ...employeeData,
            user_id: user.id,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        if (employee.type == 2) {
            // console.log(employee)
            let instructor = await models.Instructor.create({
                ...instructorData,
                employee_id: employee.id
            })

            employee.dataValues = { ...employee.dataValues, ...instructor.dataValues }
        }

        res.status(400).json({
            success: true,
            msg: 'Created employee',
            employee
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "error" });
    }

})

module.exports = routes;