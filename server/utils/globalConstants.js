module.exports = {
    USERNAME_MATCH_PATTERN: /^[a-zA-Z0-9 ]{3,30}$/,
    FIRSTNAME_MATCH_PATTERN: /^[a-zA-Z0-9 ]{3,18}$/,
    LASTNAME_MATCH_PATTERN: /^[a-zA-Z0-9 ]{3,18}$/,
    PASSWORD_MATCH_PATTERN: /^[a-zA-Z0-9 ]{8,30}$/,
    EMAIL_MATCH_PATTERN: /^[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
    ADMIN_ROLE: 'Admin',
    MODERATOR_ROLE: 'Moderator',
    STUDENT_ROLE: 'Student',
    LECTURER_ROLE: 'Lecturer',
    SERVER_PATH: 'http://localhost:3000',
    DEFAULT_PROFILE_PICTURE: 'http://www.injazuae.org/wp-content/themes/hope-charity-theme-v16-child/img/default_user.png',
    DEFAULT_STUDENT_SPECIALTY: 'Computer Science'
};
