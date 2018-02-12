const globalConstants = require('../utils/globalConstants');
const encryption = require('../utils/encryption');
const mongoose = require('mongoose');

const Student = mongoose.model('Student');
const Lecturer = mongoose.model('Lecturer');
const Course = mongoose.model('Course');

const moderatorService = (utils) => {
  return {
    createStudent(student) {
      let salt = encryption.generateSalt();
      let hashedPass = encryption.generateHashedPassword(salt, student.password);

      const reqStudent = {
          username: student.username,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          salt: salt,
          hashedPass: hashedPass,
          roles: [globalConstants.STUDENT_ROLE],
          profilePictureUrl: globalConstants.DEFAULT_PROFILE_PICTURE,
          optionalCourses: [],
          requiredCourses: [],
          specialty: student.specialty ? student.specialty : globalConstants.DEFAULT_STUDENT_SPECIALTY,
          currentCreditsCount: 0,
          creditsToAchieve: 240,
          currentCourseInUniversity: student.currentCourseInUniversity ?
          student.currentCourseInUniversity : 1,
          homeworks: [],
          homeworksMarks: []
      };

      return Student.create(reqStudent);
    },

    createLecturer(lecturer) {
      let salt = encryption.generateSalt();
      let hashedPass = encryption.generateHashedPassword(salt, lecturer.password);

      const reqLecturer = {
          username: lecturer.username,
          firstName: lecturer.firstName,
          lastName: lecturer.lastName,
          email: lecturer.email,
          salt: salt,
          hashedPass: hashedPass,
          roles: [globalConstants.LECTURER_ROLE],
          profilePictureUrl: globalConstants.DEFAULT_PROFILE_PICTURE,
          optionalCourses: [],
          requiredCourses: []
      };

      return Lecturer.create(reqLecturer);
    },

    createCourse(course) {
      const reqCourse = {
          name: course.name,
          lecturers: [],
          schedule: course.schedule,
          comments: [],
          students: [],
          marks: [],
          homeworks: [],
          homeworksMarks: [],
          isRequired: course.isRequired,
          credits: course.credits,
          maxPlacesInCourse: course.maxPlacesInCourse,
          availablePlacesInCourse: course.availablePlacesInCourse
      };

      return Course.create(reqCourse);
    },

    getAllStudents(res) {
      return Student.find({})
          .sort('username')
          .then((students) => {
            let studentToReturn;

            students = students.map((student) => {
              studentToReturn = {
                id: student._id,
                username: student.username,
                firstName: student.firstName,
                lastName: student.lastName,
                email: student.email,
                profilePictureUrl: student.profilePictureUrl === globalConstants.DEFAULT_PROFILE_PICTURE ?
                globalConstants.DEFAULT_PROFILE_PICTURE :
                student.profilePictureUrl,
                requiredCourses: student.requiredCourses,
                optionalCourses: student.optionalCourses,
                specialty: student.specialty,
                currentCourseInUniversity: student.currentCourseInUniversity,
                creditsToAchieve: student.creditsToAchieve,
                marks: student.marks
              };

              return studentToReturn;
            });

            return res.send(students);
          });
    },

    getAllRequiredCourses(res) {
      return Course.find({ isRequired: true })
          .sort('name')
          .then((courses) => {
            let courseToReturn;

            courses = courses.map((course) => {
              courseToReturn = {
                id: course._id,
                name: course.name,
                lecturers: course.lecturers,
                students: course.students,
                credits: course.credits,
                availablePlacesInCourse: course.availablePlacesInCourse
              };

              return courseToReturn;
            });

            return res.send(courses);
          });
    },

    getAllOptionalCourses(res) {
      return Course.find({ isRequired: false })
          .sort('name')
          .then((courses) => {
            let courseToReturn;

            courses = courses.map((course) => {
              courseToReturn = {
                id: course._id,
                name: course.name,
                lecturers: course.lecturers,
                students: course.students,
                credits: course.credits,
                availablePlacesInCourse: course.availablePlacesInCourse
              };

              return courseToReturn;
            });

            return res.send(courses);
          });
    },

    getStudent(studentId, res) {
      let student;
      Student.findById(studentId, function(err, s) {
        if(err) {
          return res.status(400).send({ success: false, err });
        }

        student = s;
      });

      return student;
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

    addStudentToCourse(courseId, studentId, res) {
      const student = getStudent(studentId, res);
      const course = getCourse(courseId, res);

      if(course.isRequired) {
        Course.update({ '_id': courseId },
           { $push: {'students': student }}, function(err, raw) {
             if(err) {
               return res.status(400).send({ success: false, err });
             }

            Student.update({ '_id': studentId },
               { $push: {'requiredCourses': course }}, function(err, raw) {
                 if(err) {
                   return res.status(400).send({ success: false, err });
                 }

                 return res.status(200).send({ success: true, message: 'Course updated.' });
               });
        });
      } else {
        Course.update({ '_id': courseId },
           { $push: {'students': student }}, function(err, raw) {
             if(err) {
               return res.status(400).send({ success: false, err });
             }

            Student.update({ '_id': studentId },
               { $push: {'optionalCourses': course }}, function(err, raw) {
                 if(err) {
                   return res.status(400).send({ success: false, err });
                 }

                 return res.status(200).send({ success: true, message: 'Course updated.' });
               });
        });
      };
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

module.exports = moderatorService;
