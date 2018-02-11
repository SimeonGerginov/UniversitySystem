const globalConstants = require('../utils/globalConstants');
const encryption = require('../utils/encryption');

const User = require('mongoose').model('User');

const adminService = (utils) => {
  return {
    getAllMods(res) {
      return User.find({
        roles : { "$in" : [ globalConstants.MODERATOR_ROLE ] }
      })
      .sort('firstName')
      .then((moderators) => {
          let moderatorToReturn;

          moderators = moderators.map((mod) => {
            moderatorToReturn = {
              username: mod.username,
              firstName: mod.firstName,
              lastName: mod.lastName,
              email: mod.email,
              profilePictureUrl: mod.profilePictureUrl === globalConstants.DEFAULT_PROFILE_PICTURE ?
              globalConstants.DEFAULT_PROFILE_PICTURE :
              globalConstants.SERVER_PATH + mod.profilePictureUrl
            };

            return moderatorToReturn;
          });

         return res.send(moderators);
     })
    },

    createMod(moderator) {
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
          profilePictureUrl: globalConstants.DEFAULT_PROFILE_PICTURE
      };

      return User.create(reqModerator);
    },

    addMod(moderator, res) {
      return User.find({ email: moderator.email })
         .then((foundUser) => {
            const moderatorRole = globalConstants.MODERATOR_ROLE;
            const studentRoleIndex = foundUser.roles.indexOf(studentRole);

            if(studentRoleIndex > -1) {
              foundUser.roles.splice(studentRoleIndex, 1);
            }

            foundUser.roles.push(moderatorRole);

            return User.findOneAndUpdate({ email: foundUser.email }, foundUser, function (err, place) {
              if(err) {
                return res.status(400).send({ success: false, err });
              }

              return res.status(204).send({ success: true, updatedModerator: foundUser });
            });
          });
    },

    updateMod(moderator, res) {
      return User.findById(moderator._id)
         .then((foundUser) => {
           return User.findOneAndUpdate({ email: foundUser.email }, moderator, function (err, place) {
             if(err) {
              return res.status(400).send({ success: false, err });
             }

             return res.status(204).send({ success: true, updatedModerator: foundUser });
           });
         });
    },

    deleteMod(moderator, res) {
      return User.find({ email: moderator.email })
         .then((foundUser) => {
            const moderatorRole = globalConstants.MODERATOR_ROLE;
            const indexOfModeratorRole = foundUser.roles.indexOf(moderatorRole);

            if(indexOfModeratorRole > -1) {
              foundUser.roles.splice(indexOfModeratorRole, 1);
            }

            const studentRole = globalConstants.STUDENT_ROLE;
            foundUser.roles.push(studentRole);

            return User.findOneAndUpdate({ email: foundUser.email }, foundUser, function (err, place) {
              if(err) {
                return res.status(400).send({ success: false, err });
              }

              return res.status(204).send({ success: true, updatedModerator: foundUser });
            });
      });
    }
  }
}

module.exports = adminService;
