const express = require("express");

const router = express.Router();

const adminMiddleware = require("../middlewares/AdminMiddleware");

router.user(adminMiddlware);

module.exports = (app) => app.use('/admin', router);