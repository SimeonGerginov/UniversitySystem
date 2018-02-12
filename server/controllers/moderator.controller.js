const controllerHelpers = require('../utils/controllerHelpers');

const moderatorController = ({ moderatorService }) => {
  return {
    createStudent: (req, res) => {
      const moderator = req.user;
      const student = req.body;
      const isModerator = controllerHelpers.isModerator(moderator);

      if (!isModerator) {
        return res.status(400).json({ success: false, message: 'Unauthorized user.' });
      }

      moderatorService.createStudent(student)
          .then((student) => {
              return res.send({
                success: true,
                message: `student ${student.username} created`
              });
          })
          .catch((err) => {
              return res.status(400).json({ errorMsg: err });
          });
    },

    createLecturer: (req, res) => {
      const moderator = req.user;
      const lecturer = req.body;
      const isModerator = controllerHelpers.isModerator(moderator);

      if (!isModerator) {
        return res.status(400).json({ success: false, message: 'Unauthorized user.' });
      }

      moderatorService.createLecturer(lecturer)
          .then((lecturer) => {
              return res.send({
                success: true,
                message: `lecturer ${lecturer.username} created`
              });
          })
          .catch((err) => {
              return res.status(400).json({ errorMsg: err });
          });
    },

    createCourse: (req, res) => {
      const moderator = req.user;
      const course = req.body;
      const isModerator = controllerHelpers.isModerator(moderator);

      if (!isModerator) {
        return res.status(400).json({ success: false, message: 'Unauthorized user.' });
      }

      moderatorService.createCourse(course)
          .then((course) => {
              return res.send({
                success: true,
                message: `course ${course.name} created`
              });
          })
          .catch((err) => {
              return res.status(400).json({ errorMsg: err });
          });
    }
  }
}

module.exports = moderatorController;