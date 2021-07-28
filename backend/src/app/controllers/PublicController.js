const express = require("express");

const router = express.Router();

const Product = require('../models/productModel');
const User = require('../models/userModel');

router.get('', async (req, res) => {
    res.status(200).send({message: 'ok'});
})

router.get('/products', async (req, res) => {
	var query = Product.find({})
	if(req.query.owner !== undefined){
		query = query.where('belong').equals(req.query.owner)
	}
	if(req.query.creator !== undefined){
		query = query.where('creator').equals(req.query.creator)
	}
	if(req.query.search !== undefined){
		query = query.where('name').regex('.*'+req.query.search+'.*')
	}
	var raw_products = await query.exec()
	var products = []

	var names = {}
	for(var i = 0; i < raw_products.length; i++){
		var raw = raw_products[i]
		var belong_id = raw.belong;
		if(names[belong_id] === undefined){
			var user = await User.findById(belong_id);
			names[belong_id] = user.username;
		}

		var creator_id = raw.creator;
		if(names[creator_id] === undefined){
			var user = await User.findById(creator_id);
			names[creator_id] = user.username;
		}
		products.push({
			_id:raw._id,
			name:raw.name,
			image:raw.image,
			belong:names[belong_id],
			belong_id,
			creator:names[creator_id],
			creator_id,
			price: raw.price,
			quantity: raw.quantity
		})
	}
    res.status(200).send({products});
});

router.get('/products/:id', async (req, res) => {
	const id = req.params.id;
	var product = await Product.findById({_id:id});
	const userBelong = await User.findById(product.belong);
	const userCreator = await User.findById(product.creator);
	console.log(userBelong);
	console.log(userCreator);
	product.belong = await userBelong.username;
	product.creator = await userCreator.username;
	console.log(product);
	res.status(200).send({
		product: {
			_id: product._id,
			name: product.name,
			description: product.description,
			image: product.image,
			belong: product.belong,
			creator: product.creator,
			quantity: product.quantity,
			quantitySold: product.quantitySold,
			price: product.price,
			createdAt: product.createdAt,
			updatedAt: product.updatedAt,
			_v: product._v,
			belongName: userBelong.username,
			creatorName: userCreator.username
		}
	});
});

router.get('/name/:id', async (req, res) => {
	var user = await User.findById(req.params.id);
	var name = user.username;
    res.status(200).send({name});
});

module.exports = (app) => app.use('/', router);
