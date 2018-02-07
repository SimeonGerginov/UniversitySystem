const passport = require('passport');

const attachRoutes = (app, {usersController}) => {
  app.get('/api/users/profile', passport.authenticate('jwt'), usersController.getProfileInfo);
  app.post('/api/login', usersController.login);
  app.post('/api/register', usersController.register);
  app.put('/api/users/update', passport.authenticate('jwt'), usersController.updateUserInfo);
};

module.exports = attachRoutes;
