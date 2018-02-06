const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const configApp = (app) => {
    app.use('/libs', express.static(path.join(__dirname, '../../../node_modules/')));
    app.use(express.static(path.join(__dirname, '../../../dist/')));

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(cors());

    app.set('superSecret', 'Very secret thing');
};

module.exports = configApp;
