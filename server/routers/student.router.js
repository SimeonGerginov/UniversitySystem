const passport = require('passport');
const auth = require('../config/auth');
const globalConstants = require('../utils/globalConstants');

const attachRoutes = (app, {studentController}) => {
  app.put('/api/students/:courseId', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.STUDENT_ROLE), studentController.addCommentToCourse);
};

module.exports = attachRoutes;
