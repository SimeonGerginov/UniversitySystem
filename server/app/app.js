const express = require('express');
const path = require('path');
const app = express();

const init = (settings) => {
  require('./config/app.config')(app);
  require('./config/auth.config')(app);

  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
  app.use(express.static(path.join(__dirname, '../../../dist/')));
  app.use('/libs', express.static(path.join(__dirname, '../../../node_modules/')));

  const utils = require('../utils/generateToken')(app);
  const services = require('../services')(utils);
  const controllers = require('../controllers')(services);

  require('../routers')(app, controllers);

  require('./config/socket.config')(app, settings.port);

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "../../dist/index.html"));
  });

  return Promise.resolve(app);
}

module.exports = init;
