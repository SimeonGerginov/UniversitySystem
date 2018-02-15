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

      moderatorService.createStudent(student, res)
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

      moderatorService.createLecturer(lecturer, res)
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

      moderatorService.createCourse(course, res)
          .then((course) => {
              return res.send({
                success: true,
                message: `course ${course.name} created`
              });
          })
          .catch((err) => {
              return res.status(400).json({ errorMsg: err });
          });
    },

    addStudentToCourse: (req, res) => {
      const moderator = req.user;
      const isModerator = controllerHelpers.isModerator(moderator);

      if (!isModerator) {
        return res.status(400).json({ success: false, message: 'Unauthorized user.' });
      }

      const courseId = req.params.courseId;
      const studentId = req.params.studentId;

      moderatorService.addStudentToCourse(courseId, studentId, res);
    },

    addLecturerToCourse: (req, res) => {
      const moderator = req.user;
      const isModerator = controllerHelpers.isModerator(moderator);

      if (!isModerator) {
        return res.status(400).json({ success: false, message: 'Unauthorized user.' });
      }

      const courseId = req.params.courseId;
      const lecturerId = req.params.lecturerId;

      moderatorService.addLecturerToCourse(courseId, lecturerId, res);
    },

    addMarkToStudentForCourse: (req, res) => {
      const moderator = req.user;
      const isModerator = controllerHelpers.isModerator(moderator);

      if (!isModerator) {
        return res.status(400).json({ success: false, message: 'Unauthorized user.' });
      }

      const courseId = req.params.courseId;
      const studentId = req.params.studentId;
      const mark = req.body;

      moderatorService.addMarkToStudentForCourse(courseId, studentId, mark, res);
    },

    getAllStudents: (req, res) => {
      const moderator = req.user;
      const isModerator = controllerHelpers.isModerator(moderator);

      if (!isModerator) {
        return res.status(400).json({ success: false, message: 'Unauthorized user.' });
      }

      moderatorService.getAllStudents(res);
    },

    getAllRequiredCourses: (req, res) => {
      const moderator = req.user;
      const isModerator = controllerHelpers.isModerator(moderator);

      if (!isModerator) {
        return res.status(400).json({ success: false, message: 'Unauthorized user.' });
      }

      moderatorService.getAllRequiredCourses(res);
    },

    getAllOptionalCourses: (req, res) => {
      const moderator = req.user;
      const isModerator = controllerHelpers.isModerator(moderator);

      if (!isModerator) {
        return res.status(400).json({ success: false, message: 'Unauthorized user.' });
      }

      moderatorService.getAllOptionalCourses(res);
    },

    getAllLecturers: (req, res) => {
      const moderator = req.user;
      const isModerator = controllerHelpers.isModerator(moderator);

      if (!isModerator) {
        return res.status(400).json({ success: false, message: 'Unauthorized user.' });
      }

      moderatorService.getAllLecturers(res);
    }
  }
}

module.exports = moderatorController;
