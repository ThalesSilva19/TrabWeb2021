const express = require("express");

const authMiddleware = require("../middlewares/AuthMiddleware");
const User = require('../models/userModel');
const Product = require('../models/productModel');

const router = express.Router();

router.use(authMiddleware);


router.put('/product', async (req, res) => {

	console.log(req.body)

	const { name, description, image, quantity, price, belong, creator } = req.body;
   	if (!name || !description || !image || !quantity || !price) {
        return res.status(400).send({ message: 'missing params' });
	}

	if(
		typeof name !== 'string' ||		
		typeof description !== 'string' ||		
		typeof image !== 'string'  ||		
		typeof quantity !== 'number' ||		
		typeof price !== 'number'		
	){
        return res.status(400).send({ message: 'invalid params' });
	}

	const product = await Product.create({
		name,
		description,
		image,
		quantity:Math.floor(quantity),
		price,
		belong: req.body.id,
		creator: req.body.id,
		quantitySold:0
	})

	return res.status(200).send({product})
	
})

//Buy Product
router.post('/buy', async (req, res) => {
	buys = req.body.buys;

	console.log(buys);
	
	buyer = await User.findById(req.body.id);

	for(var i =0; i < buys.length; i++){
		if(buys[i].art_id !== undefined && buys[i].quantity !== undefined){
			console.log(buys[i].art_id);
			product = await Product.findById(buys[i].art_id);
			console.log(product);
			try{
				seller = await User.findById(product.belong);
			}catch(e){
				console.log(e);
				continue;
			}
			quantity = Math.min(product.quantity, buys[i].quantity);
			var value = quantity*product.price;
			if(value < buyer.credit){
				buyer.credit -= value;
				buyer.save();
				seller.credit += value;
				seller.totalReceived += value;
				seller.save();

				let buyerProduct = {};
				buyerProduct.name = product.name;
				buyerProduct.description = product.description;
				buyerProduct.image = product.image;
				buyerProduct.belong = buyer.id;
				buyerProduct.creator = product.creator;
				buyerProduct.quantity = quantity;
				buyerProduct.quantitySold = 0;
				buyerProduct.price = 0;
				Product.create(buyerProduct);

				product.quantitySold += quantity
				product.quantity -= quantity
				if(product.quantity > 0){
					product.save()
				}
				else{
					product.remove()
				}
			}
		}
	}
    return res.status(200).send({ message: 'ok' });
})

router.get('/total', async (req, res) => {
	var data = await User.findById(req.body.id).select('totalReceived').exec()
	var total = data.totalReceived
    res.status(200).send({total});
})


module.exports = (app) => app.use('/user', router);
