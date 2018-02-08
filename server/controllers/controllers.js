const path = require('path');
const fs = require('fs');

const getControllers = (services) => {
  const controllers = {};

  fs.readdirSync(__dirname)
    .filter((file) => file.includes('.controller'))
    .forEach((fileName) => {
      const modulePath = path.join(__dirname, fileName);
      const currentController = require(modulePath);

      controllers[currentController.name] = currentController(services);
    });

  return controllers;
}

module.exports = getControllers;
