const globalConstants = require("../utils/globalConstants");
const encryption = require("../utils/encryption");

const User = require('mongoose').model('User');
const Student = require("../data/Student");
const Lecturer = require("../data/Lecturer");
const Course = require("../data/Course");
const CourseMark = require("../data/CourseMark");
const StudentMark = require("../data/StudentMark");

const moderatorService = utils => {
  return {
    createStudent(student, res) {
      Student.findOne({ email: student.email }, function(err, student) {
        if (err) {
          return res.status(400).send({ success: false, errorMessage: err });
        }

        if (student) {
          return res.status(400).send({ success: false, errorMessage: "The user already exists." });
        }
      });

      let salt = encryption.generateSalt();
      let hashedPass = encryption.generateHashedPassword(
        salt,
        student.password
      );

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
        specialty: student.specialty
          ? student.specialty
          : globalConstants.DEFAULT_STUDENT_SPECIALTY,
        currentCreditsCount: 0,
        creditsToAchieve: 240,
        currentCourseInUniversity: student.currentCourseInUniversity
          ? student.currentCourseInUniversity
          : 1,
        homeworks: [],
        marks: []
      };

      const reqUser = {
        username: student.username,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        salt: salt,
        hashedPass: hashedPass,
        roles: [globalConstants.STUDENT_ROLE],
        profilePictureUrl: globalConstants.DEFAULT_PROFILE_PICTURE
      }

      User.create(reqUser);
      return Student.create(reqStudent);
    },

    createLecturer(lecturer, res) {
      Lecturer.findOne({ email: lecturer.email }, function(err, lecturer) {
        if (err) {
          return res.status(400).send({ success: false, errorMessage: err });
        }

        if (lecturer) {
          return res.status(400).send({ success: false, errorMessage: "The user already exists." });
        }
      });

      let salt = encryption.generateSalt();
      let hashedPass = encryption.generateHashedPassword(
        salt,
        lecturer.password
      );

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

    createCourse(course, res) {
      Course.findOne({ name: course.name }, function(err, course) {
        if (err) {
          return res.status(400).send({ success: false, errorMessage: err });
        }

        if (course) {
          return res.status(400).send({ success: false, errorMessage: "The course already exists." });
        }
      });

      const reqCourse = {
        name: course.name,
        lecturers: [],
        comments: [],
        students: [],
        marks: [],
        homeworks: [],
        isRequired: course.isRequired,
        credits: course.credits,
        maxPlacesInCourse: course.maxPlacesInCourse,
        availablePlacesInCourse: course.availablePlacesInCourse
      };

      return Course.create(reqCourse);
    },

    createCourseMark(courseName, mark) {
      const courseMark = {
        courseName: courseName,
        mark: mark
      };

      CourseMark.create(courseMark).then(cm => {
        return cm;
      });
    },

    createStudentMark(studentName, mark) {
      const studentMark = {
        studentName: studentName,
        mark: mark
      };

      StudentMark.create(studentMark).then(sm => {
        return sm;
      });
    },

    getAllStudents(res) {
      return Student.find({})
        .sort("username")
        .then(students => {
          let studentToReturn;

          students = students.map(student => {
            studentToReturn = {
              id: student._id,
              username: student.username,
              firstName: student.firstName,
              lastName: student.lastName,
              email: student.email,
              profilePictureUrl:
                student.profilePictureUrl ===
                globalConstants.DEFAULT_PROFILE_PICTURE
                  ? globalConstants.DEFAULT_PROFILE_PICTURE
                  : student.profilePictureUrl,
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
        .sort("name")
        .then(courses => {
          let courseToReturn;

          courses = courses.map(course => {
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
        .sort("name")
        .then(courses => {
          let courseToReturn;

          courses = courses.map(course => {
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

    getAllLecturers(res) {
      return Lecturer.find({})
        .sort("username")
        .then(lecturers => {
          let lecturerToReturn;

          lecturers = lecturers.map(lecturer => {
            lecturerToReturn = {
              id: lecturer._id,
              username: lecturer.username,
              firstName: lecturer.firstName,
              lastName: lecturer.lastName,
              email: lecturer.email,
              profilePictureUrl:
                lecturer.profilePictureUrl ===
                globalConstants.DEFAULT_PROFILE_PICTURE
                  ? globalConstants.DEFAULT_PROFILE_PICTURE
                  : lecturer.profilePictureUrl,
              requiredCourses: lecturer.requiredCourses,
              optionalCourses: lecturer.optionalCourses
            };

            return lecturerToReturn;
          });

          return res.send(lecturers);
        });
    },

    getStudent(studentId) {
      return Student.findById(studentId);
    },

    getLecturer(lecturerId) {
      return Lecturer.findOne({ _id: lecturerId });
    },

    getCourse(courseId) {
      return Course.findOne({ _id: courseId });
    },

    updateStudent(studentToUpdate, res) {
      return Student.findOneAndUpdate(
        { email: studentToUpdate.email },
        studentToUpdate,
        function(err, student) {
          if (err) {
            return res.status(400).send({ success: false, err });
          }
        }
      );
    },

    addStudentToCourse(courseId, studentId, res) {
      this.getCourse(courseId).then(course => {
        this.getStudent(studentId).then(student => {
          if (course.isRequired) {
            Course.update(
              { _id: courseId },
              { $push: { students: student } },
              function(err, raw) {
                if (err) {
                  return res.status(400).send({ success: false, err });
                }

                Student.update(
                  { _id: studentId },
                  { $push: { requiredCourses: course } },
                  function(err, raw) {
                    if (err) {
                      return res.status(400).send({ success: false, err });
                    }

                    return res
                      .status(200)
                      .send({ success: true, message: "Course updated." });
                  }
                );
              }
            );
          } else {
            Course.update(
              { _id: courseId },
              { $push: { students: student } },
              function(err, raw) {
                if (err) {
                  return res.status(400).send({ success: false, err });
                }

                Student.update(
                  { _id: studentId },
                  { $push: { optionalCourses: course } },
                  function(err, raw) {
                    if (err) {
                      return res.status(400).send({ success: false, err });
                    }

                    return res
                      .status(200)
                      .send({ success: true, message: "Course updated." });
                  }
                );
              }
            );
          }
        });
      });
    },

    addLecturerToCourse(courseId, lecuturerId, res) {
      this.getCourse(courseId).then(course => {
        this.getLecturer(lecuturerId).then(lecturer => {
          if (course.isRequired) {
            Course.update(
              { _id: courseId },
              { $push: { lecturers: lecturer } },
              function(err, raw) {
                if (err) {
                  return res.status(400).send({ success: false, err });
                }

                Lecturer.update(
                  { _id: lecuturerId },
                  { $push: { requiredCourses: course } },
                  function(err, raw) {
                    if (err) {
                      return res.status(400).send({ success: false, err });
                    }

                    return res
                      .status(200)
                      .send({ success: true, message: "Course updated." });
                  }
                );
              }
            );
          } else {
            Course.update(
              { _id: courseId },
              { $push: { lecturers: lecturer } },
              function(err, raw) {
                if (err) {
                  return res.status(400).send({ success: false, err });
                }

                Lecturer.update(
                  { _id: lecturerId },
                  { $push: { optionalCourses: course } },
                  function(err, raw) {
                    if (err) {
                      return res.status(400).send({ success: false, err });
                    }

                    return res
                      .status(200)
                      .send({ success: true, message: "Course updated." });
                  }
                );
              }
            );
          }
        });
      });
    },

    addMarkToStudentForCourse(courseId, studentId, mark, res) {
      const course = getCourse(courseId, res);
      const student = getStudent(studentId, res);
      const courseMark = createCourseMark(course.name, mark);
      const studentMark = createStudentMark(student.username, mark);

      Course.update(
        { _id: courseId },
        { $push: { marks: studentMark } },
        function(err, raw) {
          if (err) {
            return res.status(400).send({ success: false, err });
          }

          Student.update(
            { _id: studentId },
            { $push: { marks: courseMark } },
            function(err, raw) {
              if (err) {
                return res.status(400).send({ success: false, err });
              }

              return res
                .status(200)
                .send({ success: true, message: "Mark of student added." });
            }
          );
        }
      );
    }
  };
};

module.exports = moderatorService;
