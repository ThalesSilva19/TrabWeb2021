const express = require("express");
const router = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/userModel');


function generateJWT(params) {
    return jwt.sign(params, process.env.SECRET, {
        expiresIn: 86400,
    });
}

router.put('/register', async (req, res) => {
    const { name, email, password, username, totalReceived, phone, address } = req.body;

    if (!name || !email || !password || !username || !phone || !address){
        return res.status(400).send({ message: 'missing params' });
    }

    if (
        typeof name !== 'string' || 
        typeof email !== 'string' ||
        typeof password !== 'string' ||
        typeof username !== 'string' ||
        typeof phone !== 'string' ||
        typeof address !== 'string' 
    ) {
        return res.status(400).send({ message: 'invalid params' });
    }

    try {
        if (await User.findOne({ email })) {
            return res.status(400).send({ message: 'this email is already in use' });
        }

        const user = await User.create({ 
            name,
            email,
            password,
            username,
            totalReceived: 0,
            phone,
            address 
        });

        const jwt = generateJWT({ id: user._id });

		var auxUser = {
			name: user.username,
			email: user.email,
			isAdmin: user.isAdmin,
			token: 'Bearer ' + jwt
		}
		return res.status(200).send(auxUser);

    } catch (err) {
        return res.status(400).send({ message: `error: ${err}` });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).send({ message: 'missing params' });

    if (typeof email !== 'string' || typeof password !== 'string')
        return res.status(400).send({ message: 'invalid params type' });

    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user)
            return res.status(400).send({ message: 'user not found' });

        if (!(await bcrypt.compare(password, user.password)))
            return res.status(400).send({ message: 'invalid password' });

        else {
            const jwt = generateJWT({ id: user._id });

			var auxUser = {
				name: user.username,
				email: user.email,
				isAdmin: user.isAdmin,
				token: 'Bearer ' + jwt
			}
			return res.status(200).send(auxUser);

        }
    } catch (err) {
        return res.status(400).send({ message: 'error: ' + err });
    }
});

module.exports = (app) => app.use('/auth', router);
