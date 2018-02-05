const app = require('express')();
const utils = require('./server/utils/generateToken')(app);

module.exports = {
    users: require('./users.controller')(utils)
};
