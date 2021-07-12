import express from "express";

const router = express.Router();

module.exports = (app) => app.use('/auth', router);