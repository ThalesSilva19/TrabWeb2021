var express = require('express');
var cors = require('cors')
var app = express();

app.use(express.json())
app.use(express.urlencoded({ extended:true }));
app.use(cors());

require('./app/controllers/MainController.js')(app);

require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

module.exports = app;