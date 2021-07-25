async function authenticate(req, res, next){
	if(!req.headers || !req.headers.authorization){
		return res.status(401).send('unauthorized');
	}
	try {
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