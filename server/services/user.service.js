const encryption = require('../utils/encryption');
const globalConstants = require('../utils/globalConstants');

const User = require('mongoose').model('User');
const Student = require('mongoose').model('Student');
const Course = require('mongoose').model('Course');

const userService = (utils) => {
  return {
    createUser(reqUser, res) {
      User.findOne({ username: reqUser.username }, function(err, user) {
        if(err) {
          return res.status(400).send({ success: false, errorMessage: err });
        }

        if(user) {
          return res.status(400).send({ success: false, errorMessage: 'User already exists.' });
        }
      });

      let salt = encryption.generateSalt();
      let hashedPass = encryption.generateHashedPassword(salt, reqUser.password);

      const user = {
            username: reqUser.username,
            firstName: reqUser.firstName,
            lastName: reqUser.lastName,
            email: reqUser.email,
            salt: salt,
            hashedPass: hashedPass,
            roles: [ globalConstants.STUDENT_ROLE ],
            profilePictureUrl: globalConstants.DEFAULT_PROFILE_PICTURE
      };

      return User.create(user);
    },

    getUserProfileInfo(reqUser) {
      const user = {
        username: reqUser.username,
        firstName: reqUser.firstName,
        lastName: reqUser.lastName,
        email: reqUser.email,
        profilePictureUrl: reqUser.profilePictureUrl
      };

      return user;
    },

    getAll(res) {
      return Student.find({}, function (err, users) {
        if(err) {
          return res.status(400).send({ success: false, err });
        }

        let userToReturn;

        users = users.map(user => {
          userToReturn = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profilePictureUrl: user.profilePictureUrl,
            specialty: user.specialty,
            currentCourseInUniversity: user.currentCourseInUniversity
          };

          return userToReturn;
        })

        res.send(users);
      });
    },

    getAllRequiredCoursesOfStudent(reqStudent, res) {
      return Student.findOne({ email: reqStudent.email })
             .then((student) => {
               let courses = student.requiredCourses;

               return res.status(200).send({ success: true, courses });
             });
    },

    getAllOptionalCoursesOfStudent(reqStudent, res) {
      return Student.findOne({ email: reqStudent.email })
             .then((student) => {
               let courses = student.optionalCourses;

               return res.status(200).send({ success: true, courses });
             });
    },

    updateUser(userToUpdate, res) {
      return User.findOneAndUpdate({ email: userToUpdate.email }, userToUpdate, function (err, user) {
        if(err) {
          return res.status(400).send({ success: false, err });
        }

        return res.status(204).send({ success: true, updatedUser: userToUpdate });
      });
    },

    findUserByEmail(email) {
      return User.findOne({ email: email });
    },

    findCourse(courseId, res) {
      return Course.findOne({_id: courseId }, function (err, course) {
        if(err) {
          return res.status(400).send({ success: false, err });
        }

        let courseToReturn = {
          id: course._id,
          name: course.name,
          students: course.students,
          lecturers: course.lecturers,
          comments: course.comments,
          credits: course.credits
        };

        res.send(courseToReturn);
      });
    },

    getToken(user) {
      const jwtObject = {
        _id: user._id,
        username: user.username
      };

      const token = utils.generateToken(jwtObject);
      return token;
    },

    getUserRole(user) {
      const roles = user.roles;

      return roles[0];
    }
  }
}

module.exports = userService;
