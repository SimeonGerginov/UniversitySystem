const fs = require('fs');
const path = require('path');

const attachRoutes = (app, controllers) => {
  fs.readdirSync(__dirname)
    .filter((file) => file.includes('.router'))
    .forEach((filename) => {
      const modulePath = path.join(__dirname, filename);
      require(modulePath)(app, controllers);
    });
};

module.exports = attachRoutes;
