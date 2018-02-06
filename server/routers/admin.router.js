const passport = require('passport');
const auth = require('../config/auth');
const globalConstants = require('../utils/globalConstants');

const attachRoutes = (app, {adminController}) => {
  app.get('/admin/moderators/all', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.ADMIN_ROLE), adminController.getAllModerators);
  app.post('/admin/moderators/create', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.ADMIN_ROLE), adminController.createModerator);
  app.put('/admin/moderators/add', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.ADMIN_ROLE), adminController.addModerator);
  app.put('/admin/moderators/update', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.ADMIN_ROLE), adminController.updateModerator);
  app.put('/admin/moderators/remove', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.ADMIN_ROLE), adminController.removeModerator);
};

module.exports = attachRoutes;
