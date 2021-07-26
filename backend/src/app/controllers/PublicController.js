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

router.get('/name/:id', async (req, res) => {
	var user = await User.findById(req.params.id);
	var name = user.username;
    res.status(200).send({name});
	
})

module.exports = (app) => app.use('/', router);
