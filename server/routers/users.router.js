const passport = require('passport');

const attachTo = (app, {usersController}) => {
  app.post('/api/login', usersController.login);
  app.post('/api/register', usersController.register);
  app.get('/users/profile', passport.authenticate('jwt'), usersController.getProfileInfo);
  app.put('/users/update', passport.authenticate('jwt'), usersController.updateUserInfo);
}

module.exports = { attachTo };
