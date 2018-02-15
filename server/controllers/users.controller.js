const encryption = require('../utils/encryption');
const globalConstants = require('../utils/globalConstants');
const controllerHelpers = require('../utils/controllerHelpers');

const usersController = ({ userService, moderatorService }) => {
  return {
    register: (req, res) => {
       if (req.user) {
          return res.status(400).json({errorMessage: 'You are already logged in.'})
       }

       moderatorService.createStudent(req.body, res)
          .then(() => {
          })
          .catch((err) => {
            return res.status(400).json({ errorMessage: err });
          });

       userService.createUser(req.body)
          .then((user) => {
              return res.status(200).send({
                success: true,
                message: `user ${user.username} created`
              });
          })
          .catch((err) => {
              console.log(err);
              return res.status(400).json({ success: false, errorMessage: err });
          });
    },

    login: (req, res) => {
      let reqUser = req.body;
      const email = reqUser.email;

      userService.findUserByEmail(email)
          .then((user) => {
              if(!user) {
                  return res.status(400).json({ errorMsg: 'User was not found.' });
              }

              if(!user.authenticate(user, reqUser.password)){
                  return res.status(400).json({ errorMsg: 'User is not authenticated.' });
              }

              const token = userService.getToken(user);
              let role = userService.getUserRole(user);

              return res.send({
                success: true,
                message: `User ${user.username} is now logged in!`,
                token: token,
                username: user.username,
                role: role,
                profilePicture: globalConstants.SERVER_PATH + user.profilePictureUrl
              });
          })
          .catch((err) => {
            res.status(400).send(({ success: false, message: 'Invalid Credentials' }))
          });
    },

    getProfileInfo(req, res) {
      const user = userService.getUserProfileInfo(req.user);
      return res.json({ success: true, user });
    },

    getCourse(req, res) {
      const courseId = req.params.courseId;

      userService.findCourse(courseId, res);
    },

    getAllRequiredCoursesOfStudent(req, res) {
      const user = req.user;
      const isStudent = controllerHelpers.isStudent(user);

      if (!isStudent) {
        return res.status(400).json({ success: false, message: 'Unauthorized user.' });
      }

      console.log('in controller');

      userService.getAllRequiredCoursesOfStudent(user, res);
    },

    getAllOptionalCoursesOfStudent(req, res) {
      const user = req.user;
      const isStudent = controllerHelpers.isStudent(user);

      if (!isStudent) {
        return res.status(400).json({ success: false, message: 'Unauthorized user.' });
      }

      userService.getAllOptionalCoursesOfStudent(user, res);
    },

    updateUserInfo(req, res) {
      const userToUpdate = req.body;
      const loggedUser = req.user;

      if(loggedUser.roles[0] === 'Student') {
        const studentToUpdate = userToUpdate
        moderatorService.updateStudent(studentToUpdate, res);
      }

      if(loggedUser.email !== userToUpdate.email) {
        return res.status(400).send({ success: false, message: 'Can not edit user.' });
      }
      return userService.updateUser(userToUpdate, res);
    },

    getAllRegularUsers(req, res) {
      return userService.getAll(res);
    }
  }
};

module.exports = usersController;
