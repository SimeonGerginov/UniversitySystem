const usersController = require('../controllers/users.controller');

module.exports = (app) => {
    userRoutes: require('./users.router')(app, usersController)
};