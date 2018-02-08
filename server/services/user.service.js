const encryption = require('../utils/encryption');
const globalConstants = require('../utils/globalConstants');
const utils = require('../utils/generateToken');

const User = require('mongoose').model('User');

const userService = () => {
  return {
    createUser(reqUser) {
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
        profilePictureUrl: globalConstants.SERVER_PATH + reqUser.profilePictureUrl
      };

      return user;
    },

    getAll(res) {
      const role = globalConstants.STUDENT_ROLE;
      return User.find({ 'roles': role }, function (err, users) {
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
            profilePictureUrl: globalConstants.SERVER_PATH + user.profilePictureUrl
          };

          return userToReturn;
        })

        res.send(users);
      });
    },

    updateUser(userToUpdate, res) {
      return User.findOneAndUpdate({ email: userToUpdate.email }, userToUpdate, function (err, place) {
        if(err) {
          return res.status(400).send({ success: false, err });
        }

        return res.status(204).send({ success: true, updatedUser: userToUpdate });
      });
    },

    findUserByEmail(email) {
      return User.findOne({ email: email });
    },

    getToken(user) {
      const jwtObject = {
        _id: user._id,
        username: user.username
      };

      const token = utils.generateToken(jwtObject);
      return token;
    }
  }
}

module.exports = userService;
