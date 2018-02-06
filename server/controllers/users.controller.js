const encryption = require('../utils/encryption');
const User = require('mongoose').model('User');

const DEFAULT_PROFILE_PICTURE = 'http://www.injazuae.org/wp-content/themes/hope-charity-theme-v16-child/img/default_user.png';
const DEFAULT_ROLE = 'Student';

const usersController = (utils) => {
  return {
    register: (req, res) => {
       if (req.user) {
          return res.status(400).json({errorMessage: 'You are already logged in.'})
       }

       let salt = encryption.generateSalt();
       let hashedPass = encryption.generateHashedPassword(salt, req.body.password);

       const reqUser = {
          username: req.body.username,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          salt: salt,
          hashedPass: hashedPass,
          roles: [DEFAULT_ROLE],
          profilePictureUrl: DEFAULT_PROFILE_PICTURE
       };

       User.create(reqUser)
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

    login: (req, res) => {
      let reqUser = req.body;
      console.log(reqUser);

      User.findOne({ email: reqUser.email })
          .then((user) => {
              if(!user) {
                  return res.status(400).json({ errorMsg: 'User was not found.' });
              }

              if(!user.authenticate(reqUser.password)){
                  return res.status(400).json({ errorMsg: 'User is not authenticated.' });
              }

              const jwtObject = {
                _id: user._id,
                username: user.username
              };

              const token = utils.generateToken(jwtObject);

              return res.send({
                success: true,
                message: `User ${user.username} is now logged in!`,
                token: token,
                username: user.username,
                profilePicture: user.profilePictureUrl
              });
          })
          .catch(() => {
            res.status(400).send(({ success: false, message: 'Invalid Credentials' }))
          });
    },

    getProfileInfo(req, res) {
      const user = req.user;

      delete user.salt;
      delete user.hashedPass;

      return res.json({ success: true, user });
    },

    updateUserInfo(req, res) {
      const userToUpdate = req.body;
      const loggedUser = req.user;

      if(loggedUser.email !== userToUpdate.email) {
        return res.status(400).send({ success: false, message: 'Can not edit user' });
      }

      return User.find({ email: userToUpdate.email })
              .then((foundUser) => {
                foundUser.firstName = userToUpdate.firstName
                foundUser.lastName = userToUpdate.lastName,
                foundUser.profilePictureUrl = userToUpdate.profilePictureUrl;
                foundUser.username = userToUpdate.username;

                return User.update(foundUser);
              })
              .then(() => {
                return res.status(204).send({ success: true, updateUser: userToUpdate });
              })
              .catch((err) => {
                return res.status(400).send({ success: false, err });
              });
    }
  }
};

module.exports = usersController;
