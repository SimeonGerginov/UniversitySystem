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
    }
  }
}

module.exports = moderatorService;
