const passport = require('passport');
const auth = require('../config/auth');
const globalConstants = require('../utils/globalConstants');

const attachRoutes = (app, {chatController}) => {
  app.get('/api/chat/rooms/:room', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.STUDENT_ROLE), chatController.getAllChatsInRoom);
  app.get('/api/chat/:chatId', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.STUDENT_ROLE), chatController.getChatById);
  app.post('/api/chat', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.STUDENT_ROLE), chatController.createChat);
  app.put('/api/chat/:chatId', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.STUDENT_ROLE), chatController.updateChat);
  app.delete('/api/chat/:chatId', passport.authenticate('jwt'),
          auth.isInRole(globalConstants.STUDENT_ROLE), chatController.deleteChat);
};

module.exports = attachRoutes;
