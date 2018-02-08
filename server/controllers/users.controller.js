const encryption = require('../utils/encryption');
const globalConstants = require('../utils/globalConstants');

const usersController = ({ userService }) => {
  return {
    register: (req, res) => {
       if (req.user) {
          return res.status(400).json({errorMessage: 'You are already logged in.'})
       }

       userService.createUser(req.body)
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

              return res.send({
                success: true,
                message: `User ${user.username} is now logged in!`,
                token: token,
                username: user.username,
                profilePicture: globalConstants.SERVER_PATH + user.profilePictureUrl
              });
          })
          .catch(() => {
            res.status(400).send(({ success: false, message: 'Invalid Credentials' }))
          });
    },

    getProfileInfo(req, res) {
      const user = userService.getUserProfileInfo(req.user);
      return res.json({ success: true, user });
    },

    updateUserInfo(req, res) {
      const userToUpdate = req.body;
      const loggedUser = req.user;

      if(loggedUser.email !== userToUpdate.email) {
        return res.status(400).send({ success: false, message: 'Can not edit user' });
      }

      return userService.updateUser(userToUpdate, res);
    },

    getAllRegularUsers(req, res) {
      return userService.getAll(res);
    }
  }
};

module.exports = usersController;
