const studentController = ({ studentService }) => {
  return {
    addCommentToCourse: (req, res) => {
      const student = req.user;
      console.log(student);

      const courseId = req.params.courseId;
      const { comment } = req.body;

      studentService.addCommentToCourse(courseId, student, comment, res);
    },

    addHomeworkToCourse: (req, res) => {
      const student = req.user;
      const isStudent = controllerHelpers.isStudent(student);

      if (!isStudent) {
        return res.status(400).json({ success: false, message: 'Unauthorized user.' });
      }

      const courseId = req.params.courseId;
      const studentUsername = req.params.studentUsername;
      const homework = req.body;

      studentService.addHomeworkToCourse(courseId, studentUsername, homework, res);
    }
  }
}

module.exports = studentController;
