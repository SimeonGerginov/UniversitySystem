const globalConstants = require('../utils/globalConstants');
const encryption = require('../utils/encryption');

const User = require('mongoose').model('User');

const adminService = (utils) => {
  return {
    getAllMods(res) {
      return User.find({
        roles : { "$in" : [ globalConstants.MODERATOR_ROLE ] }
      })
      .sort('username')
      .then((moderators) => {
          let moderatorToReturn;

          moderators = moderators.map((mod) => {
            moderatorToReturn = {
              id: mod._id,
              username: mod.username,
              firstName: mod.firstName,
              lastName: mod.lastName,
              email: mod.email,
              profilePictureUrl: mod.profilePictureUrl === globalConstants.DEFAULT_PROFILE_PICTURE ?
              globalConstants.DEFAULT_PROFILE_PICTURE :
              mod.profilePictureUrl
            };

            return moderatorToReturn;
          });

         return res.send(moderators);
     })
    },

    getMod(id, res) {
      return User
          .findById(id)
          .then((moderator) => {
              if(!moderator) {
                 return res.status(400).json({ success: false, message: 'Moderator not found.' });
              }

              let moderatorToReturn = {
                username: moderator.username,
                firstName: moderator.firstName,
                lastName: moderator.lastName,
                email: moderator.email,
                profilePictureUrl: moderator.profilePictureUrl === globalConstants.DEFAULT_PROFILE_PICTURE ?
                globalConstants.DEFAULT_PROFILE_PICTURE :
                moderator.profilePictureUrl,
                roles: moderator.roles
              };

              return res.send(moderatorToReturn)
          });
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

    updateMod(moderator, res) {
      return User.findOneAndUpdate({ email: moderator.email }, moderator, function (err, result) {
        if(err) {
         return res.status(400).json({ success: false, err });
        }

        return res.status(204).json({ success: true, updatedModerator: moderator });
      });
    },

    deleteMod(id, res) {
      return User.findOneAndRemove({ _id: id }, function(err, res) {
        if(err) {
          return res.status(400).send({ success: false, err });
        }

        return res.status(204).send({ success: true, message: 'Moderator deleted.' });
      });
    }
  }
}

module.exports = adminService;
