const express = require("express");

const authMiddleware = require("../middlwares/AuthMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.put('/', async (req, res) => {
	var total = User.findById(req.body.id).select(totalReceived)
    res.status(200).send({total});
})


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

module.exports = (app) => app.use('/user', router);