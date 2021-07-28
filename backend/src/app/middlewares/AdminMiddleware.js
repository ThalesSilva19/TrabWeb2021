const User = require('../models/userModel');
var jwt = require('jsonwebtoken');

async function authenticate(req, res, next){
	if(!req.headers || !req.headers.auth){
		return res.status(401).send('unauthorized');
	}
	try{
		var token = req.headers.auth.split(' ')[1];
		var decoded = jwt.verify(token,process.env.SECRET);
		req.body.id = decoded.id;
		const user = await User.findById(decoded.id);
        if(user.isAdmin){
            next()
		}
        else{
            return res.status(401).send('unauthorized');
		}
	}
	catch{
		return res.status(401).send('unauthorized');
	}
}

module.exports = authenticate;
