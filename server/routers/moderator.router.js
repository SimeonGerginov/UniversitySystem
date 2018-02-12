const passport = require('passport');
const auth = require('../config/auth');
const globalConstants = require('../utils/globalConstants');

const attachRoutes = (app, {moderatorController}) => {
  app.get('/api/moderator/students', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.MODERATOR_ROLE), moderatorController.getAllStudents());
  app.get('/api/moderator/courses/required', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.MODERATOR_ROLE), moderatorController.getAllRequiredCourses());
  app.get('/api/moderator/courses/optional', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.MODERATOR_ROLE), moderatorController.getAllOptionalCourses());
  app.post('/api/moderator/students', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.MODERATOR_ROLE), moderatorController.createStudent);
  app.post('/api/moderator/lecturers', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.MODERATOR_ROLE), moderatorController.createLecturer);
  app.post('/api/moderator/courses', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.MODERATOR_ROLE), moderatorController.createCourse);
  app.put('/api/moderator/:courseId/:studentId', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.MODERATOR_ROLE), moderatorController.addStudentToCourse);
  app.put('/api/moderator/:courseId', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.MODERATOR_ROLE), moderatorController.addCommentToCourse);
};

module.exports = attachRoutes;
