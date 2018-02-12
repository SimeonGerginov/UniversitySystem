const passport = require('passport');
const auth = require('../config/auth');
const globalConstants = require('../utils/globalConstants');

const attachRoutes = (app, {adminController}) => {
  app.get('/api/admin/moderators', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.ADMIN_ROLE), adminController.getAllModerators);
  app.get('/api/admin/moderators/:id', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.ADMIN_ROLE), adminController.getModerator);
  app.post('/api/admin/moderators', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.ADMIN_ROLE), adminController.createModerator);
  app.put('/api/admin/moderators/:id', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.ADMIN_ROLE), adminController.updateModerator);
  app.delete('/api/admin/moderators/:id', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.ADMIN_ROLE), adminController.deleteModerator);
};

module.exports = attachRoutes;
