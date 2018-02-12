const mongoose = require('mongoose');

const Course = mongoose.model('Course');
const Student = mongoose.model('Student');
const Homework = mongoose.model('Homework');

const studentService = (utils) => {
  return {
    createHomework(homework) {
      let homeworkToCreate = {
        name: homework.name,
        students: [],
        fileUrl: homework.fileUrl
      };

      Homework.create(homeworkToCreate)
         .then((h) => {
           return h;
         });
    },

    getCourse(courseId, res) {
      let course;
      Course.findById(courseId, function(err, c) {
        if(err) {
          return res.status(400).send({ success: false, err });
        }

        course = c;
      });

      return course;
    },

    addCommentToCourse(courseId, comment, res) {
      const course = getCourse(courseId, res);

      Course.update({ '_id': courseId },
           { $push: { 'comments': comment }}, function(err, raw) {
             if(err) {
               return res.status(400).send({ success: false, err });
             }

             return res.status(200).send({ success: true, message: 'Course updated.' });
      });
    },

    addHomeworkToCourse(courseId, studentId, homework, res) {
      const homework = createHomework(homework);

      Course.update({ '_id': courseId },
            { $push: { 'homeworks': homework }}, function(err, raw) {
              if(err) {
                return res.status(400).send({ success: false, err });
              }

              Student.update({ '_id': studentId },
                  { $push: { 'homeworks': homework }}, function(err, raw) {
                    if(err) {
                      return res.status(400).send({ success: false, err });
                    }

                    return res.status(200).send({ success: true, message: 'Homework added.' });
                  })
            });
    }
  }
}

module.exports = studentService;
