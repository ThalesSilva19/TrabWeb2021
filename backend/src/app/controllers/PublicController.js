const express = require("express");

const router = express.Router();

const Product = require('../models/productModel')

router.get('', async (req, res) => {
    res.status(200).send({message: 'ok'});
})

module.exports = (app) => app.use('/', router);