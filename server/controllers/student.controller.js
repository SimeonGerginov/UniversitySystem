const controllerHelpers = require('../utils/controllerHelpers');

const studentController = ({ studentService }) => {
  return {
    addCommentToCourse: (req, res) => {
      const student = req.user;
      const isStudent = controllerHelpers.isStudent(student);

      if (!isStudent) {
        return res.status(400).json({ success: false, message: 'Unauthorized user.' });
      }

      const courseId = req.parama.courseId;
      const comment = req.body;

      studentService.addCommentToCourse(courseId, comment, res);
    },

    addHomeworkToCourse: (req, res) => {
      const student = req.user;
      const isStudent = controllerHelpers.isStudent(student);

      if (!isStudent) {
        return res.status(400).json({ success: false, message: 'Unauthorized user.' });
      }

      const courseId = req.params.courseId;
      const studentId = req.params.studentId;
      const homework = req.body;

      studentService.addHomeworkToCourse(courseId, studentId, homework, res);
    }
  }
}

module.exports = studentController;
