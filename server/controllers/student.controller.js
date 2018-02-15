const studentController = ({ studentService }) => {
  return {
    addCommentToCourse: (req, res) => {
      const student = req.user;

      const courseId = req.params.courseId;
      const { comment } = req.body;

      studentService.addCommentToCourse(courseId, student, comment, res);
    },

    addHomeworkToCourse: (req, res) => {
      const student = req.user;

      const courseId = req.params.courseId;
      const studentUsername = req.params.studentUsername;
      const homework = req.body;

      studentService.addHomeworkToCourse(courseId, studentUsername, homework, res);
    }
  }
}

module.exports = studentController;
