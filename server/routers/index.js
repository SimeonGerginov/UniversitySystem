const usersController = require('../controllers/users.controller');
const app = require('express')();

const userRoutes = require('./users.router')(app, usersController);

module.exports = {
    userRoutes
};