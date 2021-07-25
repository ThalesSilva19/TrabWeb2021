const User = require('../models/userModel');

async function authenticate(req, res, next){
	if(!req.headers || !req.headers.authorization){
		return res.status(401).send('unauthorized');
	}
	try{
		var auth = req.headers.auth;
		var token = auth.split[' '];
		var decoded = jwt.verify(token,process.env.SECRET);
		req.body.userId = decoded.id;
        const user = await User.findById(req.body.userId);
        if(user.isAdmin)
            next()
        else
            return res.status(401).send('unauthorized');
	}
	catch{
		return res.status(401).send('unauthorized');
	}
}