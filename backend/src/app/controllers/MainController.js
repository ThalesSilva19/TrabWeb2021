const express = require("express");

const fs = require('fs');
const path = require('path');

module.exports = function (app) {
    fs
        .readdirSync(__dirname)
        .filter((file) => ((file.indexOf('.')) !== 0 && (file !== "MainController.js")))
        .forEach((file) => require(path.resolve(__dirname, file))(app))
}