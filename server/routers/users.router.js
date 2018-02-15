const passport = require('passport');
const auth = require('../config/auth');
const globalConstants = require('../utils/globalConstants');

const attachRoutes = (app, {usersController}) => {
  app.get('/api/users/profile', passport.authenticate('jwt'), usersController.getProfileInfo);
  app.get('/api/users', usersController.getAllRegularUsers);
  app.get('/api/courses/:courseId', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.STUDENT_ROLE), usersController.getCourse);
  app.get('/api/required/courses', passport.authenticate('jwt'),
          usersController.getAllRequiredCoursesOfStudent);
  app.get('api/optional/courses', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.STUDENT_ROLE), usersController.getAllOptionalCoursesOfStudent);
  app.post('/api/login', usersController.login);
  app.post('/api/register', usersController.register);
  app.put('/api/users/update', passport.authenticate('jwt'), usersController.updateUserInfo);
};

module.exports = attachRoutes;
