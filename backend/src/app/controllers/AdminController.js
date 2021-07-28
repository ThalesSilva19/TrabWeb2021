const express = require("express");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

const adminMiddleware = require("../middlewares/AdminMiddleware");
const Product = require('../models/productModel');
const User = require('../models/userModel');

router.use(adminMiddleware);

router.get('', async (req, res) => {
    res.status(200).send({message: 'ok'});
})

//----------------------------//
//--------- PRODUCT ----------//
//----------------------------//
router.get('/products', async (req, res) => {
	var query = Product.find({}).populate('belong', 'username').populate('creator', 'username');
	products = await query.exec()
    res.status(200).send({products});
});

router.delete('/products/:id', async (req, res) => {
	try{
		console.log(req.params.id);
		await Product.findByIdAndRemove(req.params.id);
		return res.status(200).send({ message: 'Product deleted'});
    } catch (err) {
        return res.status(400).send({ message: `error: ${err}` });
    }
});

router.get('/products/:id', async (req, res) => {
	try{
		const product = await Product.findById(req.params.id);
		return res.status(200).send(product);
    } catch (err) {
        return res.status(400).send({ message: `error: ${err}` });
    }
});

router.put('/products', async (req, res) => {
    const { name, description, image, belong, creator, quantity, quantitySold, price } = req.body;

    if (name===undefined || image===undefined || belong===undefined || creator===undefined || quantity===undefined || quantitySold===undefined || price===undefined){
        return res.status(400).send({ message: 'missing params' });
    }

    if (
        typeof name !== 'string' || 
        typeof image !== 'string' ||
        typeof belong !== 'string' ||
        typeof creator !== 'string' ||
        typeof quantity !== 'number' ||
        typeof quantitySold !== 'number' ||
        typeof price !== 'number'
    ) {
        return res.status(400).send({ message: 'invalid params' });
    }

    try {
        const product = await Product.create({ 
            name,
            description,
            image,
            belong,
            creator,
            quantity,
            quantitySold,
			price
        });

		return res.status(200).send({ message: "Product created" });

    } catch (err) {
        return res.status(400).send({ message: `error: ${err}` });
    }
});

router.post('/products/:id', async (req, res) => {
    const { name, description, image, belong, creator, quantity, quantitySold, price } = req.body;

    if (name===undefined || image===undefined || belong===undefined || creator===undefined || quantity===undefined || quantitySold===undefined || price===undefined){
        return res.status(400).send({ message: 'missing params' });
    }

    if (
        typeof name !== 'string' || 
        typeof image !== 'string' ||
        typeof belong !== 'string' ||
        typeof creator !== 'string' ||
        typeof quantity !== 'number' ||
        typeof quantitySold !== 'number' ||
        typeof price !== 'number'
    ) {
        return res.status(400).send({ message: 'invalid params' });
    }

    try {
		await Product.findByIdAndUpdate(req.params.id, {
			$set: {
				name,
				description,
				image,
				belong,
				creator,
				quantity,
				quantitySold,
				price
			}
		});

		return res.status(200).send({ message: "Product updated" });
    } catch (err) {
        return res.status(400).send({ message: `error: ${err}` });
    }
});

//----------------------------//
//----------- USERS ----------//
//----------------------------//

//---------- Get one ----------//
router.get('/users/:id', async (req, res) => {
	try{
		const user = await User.findById(req.params.id);
		return res.status(200).send(user);
    } catch (err) {
        return res.status(400).send({ message: `error: ${err}` });
    }
});

//---------- Delete ----------//
router.delete('/users/:id', async (req, res) => {
	try{
		await User.findByIdAndRemove(req.params.id);
		return res.status(200).send({ message: 'No user to delete'});
    } catch (err) {
        return res.status(400).send({ message: `error: ${err}` });
    }
});

//---------- Get list ----------//
router.get('/users', async (req, res) => {
	var query = User.where('isAdmin').equals(false);
	users = await query.exec();
    res.status(200).send({users});
});

router.get('/admins', async (req, res) => {
	var query = User.where('isAdmin').equals(true);
	admins = await query.exec();
    res.status(200).send({admins});
});

//---------- Update ----------//
const updateUser = async (req, res, isAdmin) => {
    const { name, email, username, credit, totalReceived, phone, address } = req.body;

    if (!name || !email || !username || !phone || !address){
        return res.status(400).send({ message: 'missing params' });
    }

    if (
        typeof name !== 'string' || 
        typeof email !== 'string' ||
        typeof username !== 'string' ||
        typeof credit !== 'number' ||
        typeof totalReceived !== 'number' ||
        typeof phone !== 'string' ||
        typeof address !== 'string' 
    ) {
        return res.status(400).send({ message: 'invalid params' });
    }

    try {
		await User.findByIdAndUpdate(req.params.id, {
			$set: {
				name,
				email,
				username,
				totalReceived,
				phone,
				address,
				isAdmin
			}
		});

		return res.status(200).send({ message: "User updated" });
    } catch (err) {
        return res.status(400).send({ message: `error: ${err}` });
    }
}

router.post('/users/:id', async (req, res) => {
	await updateUser(req, res, false);
});

router.post('/admins/:id', async (req, res) => {
	await updateUser(req, res, true);
});

//---------- Create ----------//
function generateJWT(params) {
    return jwt.sign(params, process.env.SECRET, {
        expiresIn: 86400,
    });
}

const createUser = async (req, res, isAdmin) => {
    const { name, email, password, username, phone, address } = req.body;

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
            phone,
            address,
			isAdmin
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
}

router.put('/users', async (req, res) => {
	await createUser(req, res, false);
});

router.put('/admins', async (req, res) => {
	await createUser(req, res, true);
});

module.exports = (app) => app.use('/admin', router);
