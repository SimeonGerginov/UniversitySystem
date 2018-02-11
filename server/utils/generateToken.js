const jwt = require('jsonwebtoken');

const initGenerateToken = (app) => {
  return {
    generateToken: (jwtObject) => {
      return jwt.sign(jwtObject, app.get('superSecret'), {
        expiresIn: 403040302
      });
    }
  }
};

module.exports = initGenerateToken;
