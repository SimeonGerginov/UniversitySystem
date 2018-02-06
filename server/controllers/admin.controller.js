const controllerHelpers = require('../utils/controllerHelpers');
const globalConstants = require('../utils/globalConstants');
const encryption = require('../utils/encryption');
const User = require('mongoose').model('User');

const DEFAULT_PROFILE_PICTURE = 'http://www.injazuae.org/wp-content/themes/hope-charity-theme-v16-child/img/default_user.png';

const adminController = () => {
  return {
    getAllModerators: (req, res) => {
      const admin = req.user;
      const isAdmin = controllerHelpers.isAdmin(admin);

      const moderatorRole = globalConstants.MODERATOR_ROLE;

      if (!isAdmin) {
        return res.status(400).json({ success: false, message: 'Unauthorized user.' });
      }

      return User.find({})
                 .where(moderatorRole).in(roles)
                 .sort(firstName)
                 .then((users) => {
                   users = users.map((u) => {
                     delete u.salt;
                     delete u.hashedPass;
                     return u;
                   });

                   return users;
                 })
    },

    createModerator: (req, res) => {
      const admin = req.user;
      const moderator = req.body;
      const isAdmin = controllerHelpers.isAdmin(admin);

      if (!isAdmin) {
        return res.status(400).json({ success: false, message: 'Unauthorized user.' });
      }

      let salt = encryption.generateSalt();
      let hashedPass = encryption.generateHashedPassword(salt, moderator.password);

      const reqModerator = {
          username: moderator.username,
          firstName: moderator.firstName,
          lastName: moderator.lastName,
          email: moderator.email,
          salt: salt,
          hashedPass: hashedPass,
          roles: [globalConstants.MODERATOR_ROLE],
          profilePictureUrl: DEFAULT_PROFILE_PICTURE
      };

      User.create(reqModerator)
          .then((user) => {
              return res.send({
                success: true,
                message: `user ${user.username} created`
              });
          })
          .catch((err) => {
              return res.status(400).json({ errorMsg: err });
          });
    },

    addModerator: (req, res) => {
      const admin = req.user;
      const moderator = req.body;
      const isAdmin = controllerHelpers.isAdmin(admin);

      const studentRole = globalConstants.STUDENT_ROLE;

      if (!isAdmin) {
        return res.status(400).json({ success: false, message: 'Unauthorized user.' });
      }

      return User.find({ email: moderator.email })
              .then((foundUser) => {
                 const moderatorRole = globalConstants.MODERATOR_ROLE;
                 const studentRoleIndex = foundUser.roles.indexOf(studentRole);

                 if(studentRoleIndex > -1) {
                   foundUser.roles.splice(studentRoleIndex, 1);
                 }

                 foundUser.roles.push(moderatorRole);

                 return User.update(foundUser);
              })
              .then(() => {
                return res.status(204).send({ success: true, moderator: moderator });
              })
              .catch((err) => {
                return res.status(400).send({ success: false, err });
              });
    },

    updateModerator: (req, res) => {
      const admin = req.user;
      const moderator = req.body;

      const isAdmin = controllerHelpers.isAdmin(admin);
      const isModerator = controllerHelpers.isModerator(moderator);

      if (!isAdmin) {
        return res.status(400).json({ success: false, message: 'Unauthorized user.' });
      }

      if (!isModerator) {
        return res.status(400).json({ success: false, message: 'User is not moderator.' });
      }

      return User.findById(moderator._id)
                 .then((foundUser) => {
                    foundUser.username = moderator.username;
                    foundUser.firstName = moderator.firstName;
                    foundUser.lastName = moderator.lastName;
                    foundUser.email = moderator.email;
                    foundUser.profilePictureUrl = moderator.profilePictureUrl;

                    return User.update(foundUser);
                 })
                 .then(() => {
                  return res.status(204).send({ success: true, updatedModerator: moderator });
                })
                .catch((err) => {
                  return res.status(400).send({ success: false, err });
                });
    },

    removeModerator: (req, res) => {
      const admin = req.user;
      const moderator = req.body;

      const isAdmin = controllerHelpers.isAdmin(admin);
      const isModerator = controllerHelpers.isModerator(moderator);

      if (!isAdmin) {
        return res.status(400).json({ success: false, message: 'Unauthorized user.' });
      }

      if (!isModerator) {
        return res.status(400).json({ success: false, message: 'User is not moderator.' });
      }

      return User.find({ email: moderator.email })
              .then((foundUser) => {
                 const moderatorRole = globalConstants.MODERATOR_ROLE;
                 const indexOfModeratorRole = foundUser.roles.indexOf(moderatorRole);

                 if(indexOfModeratorRole > -1) {
                   foundUser.roles.splice(indexOfModeratorRole, 1);
                 }

                 const studentRole = globalConstants.STUDENT_ROLE;
                 foundUser.roles.push(studentRole);

                 return User.update(foundUser);
              })
              .then(() => {
                return res.status(204).send({ success: true, moderator: moderator });
              })
              .catch((err) => {
                return res.status(400).send({ success: false, err });
              });
    }
  }
};

module.exports = adminController;
