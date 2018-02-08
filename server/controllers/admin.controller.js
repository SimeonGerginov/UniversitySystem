const controllerHelpers = require('../utils/controllerHelpers');

const adminController = ({ adminService }) => {
  return {
    getAllModerators: (req, res) => {
      const admin = req.user;
      const isAdmin = controllerHelpers.isAdmin(admin);

      if (!isAdmin) {
        return res.status(400).json({ success: false, message: 'Unauthorized user.' });
      }

      return adminService.getAllMods(res);
    },

    createModerator: (req, res) => {
      const admin = req.user;
      const moderator = req.body;
      const isAdmin = controllerHelpers.isAdmin(admin);

      if (!isAdmin) {
        return res.status(400).json({ success: false, message: 'Unauthorized user.' });
      }

      adminService.createMod(moderator)
          .then((moderator) => {
              return res.send({
                success: true,
                message: `moderator ${moderator.username} created`
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

      if (!isAdmin) {
        return res.status(400).json({ success: false, message: 'Unauthorized user.' });
      }

      adminService.addMod(moderator, res);
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

      adminService.updateMod(moderator, res);
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

      adminService.deleteMod(moderator, res);
    }
  }
};

module.exports = adminController;
