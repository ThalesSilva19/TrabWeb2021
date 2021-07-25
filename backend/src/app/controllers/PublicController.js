const express = require("express");

const router = express.Router();

const Product = require('../models/productModel');

router.get('', async (req, res) => {
    res.status(200).send({message: 'ok'});
})

router.get('/products', async (req, res) => {
	var query = Product.find({})
	if(req.params.owner !== undefined){
		query = query.where('belong').equals(req.params.owner)
	}
	if(req.params.creator !== undefined){
		query = query.where('creator').equals(req.params.creator)
	}
	if(req.params.last !== undefined){
		query = query.where('id').gt(req.params.last)
	}
	query = query.limit(100)
	products = await query.exec()
	console.log(products)	
    res.status(200).send({products});
});

module.exports = (app) => app.use('/', router);
