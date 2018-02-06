const express = require('express');
const app = express();

const init = () => {
  require('./config/app.config')(app);
  require('./config/auth.config')(app);

  const utils = require('../utils/generateToken')(app);
  const controllers = require('../controllers')(utils);

  require('../routers')(app, controllers);

  return Promise.resolve(app);
}

module.exports = init;
