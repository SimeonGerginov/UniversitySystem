const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

module.exports = (app) => {
    app.use('/libs', express.static(path.join(__dirname, '../node_modules/')));
    app.use(express.static(path.join(__dirname, '../../dist/')));

    app.use(cookieParser());

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(cors());

    app.use(session({
        secret: 'Super Secret',
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());
};