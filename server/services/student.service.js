const Course = require('mongoose').model('Course');

const studentService = (utils) => {
  return {
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
           { $push: {'comments': comment }}, function(err, raw) {
             if(err) {
               return res.status(400).send({ success: false, err });
             }

             return res.status(200).send({ success: true, message: 'Course updated.' });
      });
    }
  }
}

module.exports = studentService;
