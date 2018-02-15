const mongoose = require("mongoose");

const Course = mongoose.model("Course");
const Student = mongoose.model("Student");
const Homework = require("../data/Homework");

const studentService = utils => {
  return {
    getCourse(courseId) {
      return Course.findOne({ _id: courseId });
    },

    addCommentToCourse(courseId, student, comment, res) {
      commentToAdd = {
        author: student.username,
        profilePictureOfAuthor: student.profilePictureUrl,
        text: comment
      };

      Course.updateOne(
        { _id: courseId },
        { $push: { comments: commentToAdd } },
        function(err, course) {
          if (err) {
            return res.status(400).send({ success: false, err });
          }

          return res.status(201).send({ success: true, course: course });
        }
      );
    },

    addHomeworkToCourse(courseId, studentUsername, hw, res) {
      let homeworkToCreate = {
        name: hw.name,
        students: [],
        fileUrl: hw.fileUrl
      };

      Homework.create(homeworkToCreate).then(homework => {
        Course.update(
          { _id: courseId },
          { $push: { homeworks: homework } },
          function(err, raw) {
            if (err) {
              return res.status(400).send({ success: false, err });
            }

            Student.update(
              { username: studentUsername },
              { $push: { homeworks: homework } },
              function(err, raw) {
                if (err) {
                  return res.status(400).send({ success: false, err });
                }

                return res
                  .status(200)
                  .send({ success: true, message: "Homework added." });
              }
            );
          }
        );
      });
    }
  };
};

module.exports = studentService;
