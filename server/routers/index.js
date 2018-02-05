const app = require('express')();
const usersController = require('../controllers/users.controller');

module.exports = {
    userRoutes: require('./users.router')(app, usersController)
};
