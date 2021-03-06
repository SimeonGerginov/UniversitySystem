const path = require('path');
const fs = require('fs');

const getServices = (utils) => {
  const services = {};

  fs.readdirSync(__dirname)
    .filter((file) => file.includes('.service'))
    .forEach((fileName) => {
      const modulePath = path.join(__dirname, fileName);
      const currentService = require(modulePath);

      services[currentService.name] = currentService(utils);
    });

  return services;
}

module.exports = getServices;
