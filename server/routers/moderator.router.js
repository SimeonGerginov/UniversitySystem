const passport = require('passport');
const auth = require('../config/auth');
const globalConstants = require('../utils/globalConstants');

const attachRoutes = (app, {moderatorController}) => {
  app.post('/api/moderator/students', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.MODERATOR_ROLE), moderatorController.createStudent);
  app.post('/api/moderator/lecturers', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.MODERATOR_ROLE), moderatorController.createLecturer);
  app.post('/api/moderator/courses', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.MODERATOR_ROLE), moderatorController.createCourse);
};

module.exports = attachRoutes;
