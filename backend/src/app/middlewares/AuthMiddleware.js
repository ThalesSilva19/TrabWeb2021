var jwt = require('jsonwebtoken');


async function authenticate(req, res, next){
	console.log(req.headers.auth)
	if(!req.headers || !req.headers.auth){
		return res.status(401).send('unauthorized');
	}
	try {
		var auth = req.headers.auth 
		var token = auth.split(' ')[1]
		var decoded = jwt.verify(token,process.env.SECRET)
		req.body.id = decoded.id
		next()
	}
	catch(e){
		console.log(e);
		return res.status(401).send('unauthorized');
	}
}

module.exports = authenticate;
