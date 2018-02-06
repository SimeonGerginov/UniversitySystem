const path = require('path');
const fs = require('fs');

const getControllers = (utils) => {
  const controllers = {};

  fs.readdirSync(__dirname)
    .filter((file) => file.includes('.controller'))
    .forEach((fileName) => {
      const modulePath = path.join(__dirname, fileName);
      const currentController = require(modulePath);

      controllers[currentController.name] = currentController(utils);
    });

  return controllers;
}

module.exports = getControllers;
