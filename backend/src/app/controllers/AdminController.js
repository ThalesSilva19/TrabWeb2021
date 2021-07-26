const express = require("express");

const router = express.Router();

const adminMiddleware = require("../middlewares/AdminMiddleware");

router.use(adminMiddleware);

router.get('', async (req, res) => {
    res.status(200).send({message: 'ok'});
})

module.exports = (app) => app.use('/admin', router);
