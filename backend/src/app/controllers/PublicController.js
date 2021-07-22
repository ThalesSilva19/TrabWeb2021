const express = require("express");

const router = express.Router();

const Product = require('../models/productModel')


async function authenticate(req, res){
	if(!req.headers || !req.headers.authorization){
		return res.status(401).send('unauthorized');
	}
	try{
		var auth = req.headers.auth 
		var token = auth.split[' ']
		var decoded = jwt.verify(token,process.env.SECRET)
		req.body.userId = decoded.id
		next()
	}
	catch{
		return res.status(401).send('unauthorized');
	}
}

router.get('', async (req, res) => {
    res.status(200).send({message: 'ok'});
})


router.use('/user/total', authenticate)
router.put('/user', async (req, res) => {
	var total = User.findById(req.body.id).select(totalReceived)
    res.status(200).send({total});
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
})


router.use('/product', authenticate)
router.put('/product', async (req, res) => {

	const { name, description, image, quantity, price } = req.body;
   	if (!name || !description || !image || !quantity || !price) {
        return res.status(400).send({ message: 'missing params' });
	}

	if(
		typeof name !== 'string' ||		
		typeof description !== 'string' ||		
		typeof image !== 'image'  ||		
		typeof quantity !== 'number' ||		
		typeof price !== 'number'		
	){
        return res.status(400).send({ message: 'invalid params' });
	}

	Product.create({
		name,
		description,
		image,
		quantity:Math.floor(quantity),
		price,
		belong: req.body.userId,
		creator: req.body.userId,
		quantitySold:0
	})
	
})

//Buy Product
router.use('/buy', authenticate)
router.post('/buy', async (req, res) => {
	buys = req.body.buys;
	
	if(typeof buys !== 'array'){
        return res.status(400).send({ message: 'invalid params' });
	}

	for(var i =0; i < buys.length; i++){
		buyer = await User.findById(buys[i].id)
		if(buys[i].product !== undefined && buys[i].quantity !== undefined){
			product = await Product.findById(buys[i].product)
			if(product.price){
				continue;
			}
			seller = await User.findById(product.owner)
			quantity = Math.min(product.quantity, buys[i].quantity)
			var value = quantity*product.price
			if(value > buyer.credit){
				buyer.credit -= value
				buyer.save()
				seller.credit += value
				seller.totalReceived += value
				seller.save()
				
				var buyerProduct = await Product.findOne({owner:buyer.id,artId:product.artId})
				if(buyerProduct){
					buyerProduct.quantity += quantity
				}
				else{
					buyerProduct = product
					buyerProduct.owner = buyer.id;
					buyerProduct.quantity = quantity;
					buyerProduct.quantitySold = 0;
					buyerProduct.price = 0;
					Product.create(buyerProduct)
				}
				product.quantitySold += quantity
				product.quantity -= quantity
				if(product.quantity != 0){
					product.save()
				}
				else{
					products.deleteOne({id:products.id})
				}
			}
		}
	}
})






module.exports = (app) => app.use('/', router);
