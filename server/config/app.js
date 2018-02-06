const express = require('express');

const init = () => {
  const app = express();
  const utils = require('../utils/generateToken')(app);

  const controllers = require('../controllers')(utils);
  require('./passport')(app);
  require('./express')(app);
  require('../routers').attachTo(app, controllers);

  return app;
}

module.exports = { init }
