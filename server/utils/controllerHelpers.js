const globalConstants = require('./globalConstants');

module.exports = {
  isAdmin: (user) => {
    const roles = user.roles;

    if(roles.includes(globalConstants.ADMIN_ROLE)){
      return true;
    }

    return false;
  },

  isModerator: (user) => {
    const roles = user.roles;

    if(roles.includes(globalConstants.MODERATOR_ROLE)) {
      return true;
    }

    return false;
  },

  isStudent: (user) => {
    const roles = user.roles;

    if(roles.includes(globalConstants.STUDENT_ROLE)) {
      return true;
    }

    return false;
  }
};
